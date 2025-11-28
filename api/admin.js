import pg from 'pg';

const { Client } = pg;

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    // SECURITY: Admin access requires a password
    const adminPassword = process.env.ADMIN_PASSWORD;
    const requestPassword = request.headers['x-admin-password'];

    if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable not set');
        return response.status(500).json({ error: 'Server configuration error' });
    }

    if (requestPassword !== adminPassword) {
        return response.status(401).json({ error: 'Unauthorized' });
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
        const { rows } = await client.query('SELECT * FROM signups ORDER BY date DESC');
        await client.end();
        return response.status(200).json({ signups: rows });
    } catch (error) {
        console.error('Database error:', error);
        if (client) await client.end();

        // If table doesn't exist yet, return empty list
        if (error.message.includes('relation "signups" does not exist')) {
            return response.status(200).json({ signups: [] });
        }
        return response.status(500).json({ error: 'Internal server error' });
    }
}
