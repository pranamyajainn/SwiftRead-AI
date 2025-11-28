import pg from 'pg';

const { Client } = pg;

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    return response.status(200).send('ok');
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const url = new URL(process.env.POSTGRES_URL_NON_POOLING);
  const client = new Client({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const { name, email, date } = request.body;

    if (!name || !email) {
      await client.end();
      return response.status(400).json({ error: 'Name and email are required' });
    }

    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert data
    await client.query(
      'INSERT INTO signups (name, email, date) VALUES ($1, $2, $3)',
      [name, email, date]
    );

    await client.end();
    return response.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Database error:', error);
    if (client) await client.end();

    if (error.code === '23505') { // Unique violation
      return response.status(409).json({ error: 'Email already registered' });
    }
    return response.status(500).json({ error: error.message });
  }
}
