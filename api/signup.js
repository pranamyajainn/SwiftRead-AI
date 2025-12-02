import pg from 'pg';
import { CONFIG } from './antiSpamConfig.js';

const { Client } = pg;

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    return response.status(200).send('ok');
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  let client;

  try {
    if (!process.env.POSTGRES_URL_NON_POOLING) {
      throw new Error('Missing POSTGRES_URL_NON_POOLING environment variable');
    }

    const url = new URL(process.env.POSTGRES_URL_NON_POOLING);
    client = new Client({
      host: url.hostname,
      port: url.port,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: {
        rejectUnauthorized: false
      }
    });

    await client.connect();

    // Extract fields based on config
    const { name: rawName, email: rawEmail, date, [CONFIG.HONEYPOT_FIELD_NAME]: honeypot } = request.body;
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    // 0. Honeypot Check (Silent Drop)
    if (honeypot) {
      console.log(`[SPAM] Honeypot triggered by IP: ${ip}`);
      await client.end();
      // Return success to confuse the bot
      return response.status(200).json({ message: 'Signup successful' });
    }

    // Normalization
    const name = rawName ? rawName.trim() : '';
    const email = rawEmail ? rawEmail.trim().toLowerCase() : '';

    // 1. Input Validation
    if (!name || !email) {
      await client.end();
      return response.status(400).json({ error: 'Name and email are required' });
    }

    if (name.length > CONFIG.MAX_NAME_LENGTH) {
      await client.end();
      return response.status(400).json({ error: `Name is too long (max ${CONFIG.MAX_NAME_LENGTH} chars)` });
    }

    if (email.length > CONFIG.MAX_EMAIL_LENGTH) {
      await client.end();
      return response.status(400).json({ error: `Email is too long (max ${CONFIG.MAX_EMAIL_LENGTH} chars)` });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await client.end();
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Block disposable email domains
    const emailDomain = email.split('@')[1].toLowerCase();
    if (CONFIG.DISPOSABLE_EMAIL_DOMAINS.includes(emailDomain)) {
      console.log(`[SPAM] Disposable email blocked: ${emailDomain}`);
      await client.end();
      // Generic error message to not reveal specific block reason
      return response.status(400).json({ error: 'Invalid email address' });
    }

    // 2. Schema Update (Ensure IP column exists)
    await client.query(`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE signups ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);
    `);

    // 3. Rate Limiting
    const rateLimitResult = await client.query(
      `SELECT COUNT(*) FROM signups WHERE ip_address = $1 AND date > NOW() - INTERVAL '1 hour'`,
      [ip]
    );

    const recentSignups = parseInt(rateLimitResult.rows[0].count);
    if (recentSignups >= CONFIG.MAX_SIGNUPS_PER_HOUR_PER_IP) {
      console.log(`[RATE_LIMIT] IP ${ip} exceeded limit`);
      await client.end();
      return response.status(429).json({ error: 'Too many signups from this IP. Please try again later.' });
    }

    // Insert data
    await client.query(
      'INSERT INTO signups (name, email, date, ip_address) VALUES ($1, $2, $3, $4)',
      [name, email, date, ip]
    );

    await client.end();
    return response.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Database error:', error);
    if (client) await client.end();

    if (error.code === '23505') { // Unique violation
      console.log('[INFO] Duplicate signup attempt');
      // Return success to prevent user enumeration
      return response.status(200).json({ message: 'Signup successful' });
    }
    return response.status(500).json({ error: 'Internal server error' });
  }
}
