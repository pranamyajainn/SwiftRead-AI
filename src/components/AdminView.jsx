import React, { useEffect, useState } from 'react';

export default function AdminView() {
    const [signups, setSignups] = useState([]);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if we have a stored password session (optional, but good UX)
        const storedPassword = sessionStorage.getItem('admin_password');
        if (storedPassword) {
            setPassword(storedPassword);
            fetchSignups(storedPassword);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        fetchSignups(password);
    };

    const fetchSignups = async (pwd) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/admin', {
                headers: {
                    'x-admin-password': pwd
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSignups(data.signups);
                setIsAuthenticated(true);
                sessionStorage.setItem('admin_password', pwd);
            } else {
                if (response.status === 401) {
                    setError('Invalid password');
                    setIsAuthenticated(false);
                } else {
                    setError('Failed to fetch data');
                }
            }
        } catch (error) {
            console.error('Failed to fetch signups:', error);
            setError('Network error');
        } finally {
            setIsLoading(false);
        }
    };

    const downloadCSV = () => {
        const headers = ['Date', 'Name', 'Email', 'IP'];
        const csvContent = [
            headers.join(','),
            ...signups.map(row => `${new Date(row.date).toLocaleString()},${row.name},${row.email},${row.ip_address || ''}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'waitlist_signups.csv';
        link.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '400px' }}>
                <div className="card">
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Admin Password"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        {error && (
                            <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={downloadCSV} className="btn btn-primary">
                        Download CSV
                    </button>
                    <button
                        onClick={() => {
                            setIsAuthenticated(false);
                            setPassword('');
                            sessionStorage.removeItem('admin_password');
                        }}
                        className="btn"
                        style={{ border: '1px solid #e5e7eb' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Date</th>
                            <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Name</th>
                            <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Email</th>
                            <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {signups.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
                                    No signups yet.
                                </td>
                            </tr>
                        ) : (
                            signups.map((signup) => (
                                <tr key={signup.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(signup.date).toLocaleString()}</td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{signup.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{signup.email}</td>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-light)', fontSize: '0.75rem' }}>{signup.ip_address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a href="/" className="btn" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>← Back to Landing Page</a>
            </div>
        </div>
    );
}
