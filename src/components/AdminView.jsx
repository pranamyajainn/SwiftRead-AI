import React, { useEffect, useState } from 'react';

export default function AdminView() {
    const [signups, setSignups] = useState([]);

    useEffect(() => {
        fetchSignups();
    }, []);

    const fetchSignups = async () => {
        try {
            const response = await fetch('/api/admin');
            if (response.ok) {
                const data = await response.json();
                setSignups(data.signups);
            }
        } catch (error) {
            console.error('Failed to fetch signups:', error);
        }
    };



    const downloadCSV = () => {
        const headers = ['Date', 'Name', 'Email'];
        const csvContent = [
            headers.join(','),
            ...signups.map(row => `${new Date(row.date).toLocaleString()},${row.name},${row.email}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'waitlist_signups.csv';
        link.click();
    };





    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={downloadCSV} className="btn btn-primary">
                        Download CSV
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
                        </tr>
                    </thead>
                    <tbody>
                        {signups.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
                                    No signups yet.
                                </td>
                            </tr>
                        ) : (
                            signups.map((signup) => (
                                <tr key={signup.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(signup.date).toLocaleString()}</td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{signup.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{signup.email}</td>
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
