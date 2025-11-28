import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
        }
    });
}

async function testConnection() {
    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Testing database connection with pg...');
        console.log('Target Host:', new URL(process.env.POSTGRES_URL).hostname);

        await client.connect();
        console.log('Connected successfully.');

        // Try to create the table
        console.log('Creating table if not exists...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Table created/verified.');

        // Try to insert a test record
        const testEmail = `test_${Date.now()}@example.com`;
        console.log(`Inserting test record: ${testEmail}`);
        await client.query(
            'INSERT INTO signups (name, email, date) VALUES ($1, $2, $3)',
            ['Local Test PG', testEmail, new Date().toISOString()]
        );
        console.log('Insert successful.');

        // Verify insert
        const res = await client.query('SELECT * FROM signups WHERE email = $1', [testEmail]);
        console.log('Retrieved row:', res.rows[0]);

        console.log('✅ Database verification passed!');
        await client.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database verification failed:', error);
        if (client) await client.end();
        process.exit(1);
    }
}

testConnection();
