import React from 'react';
import Logo from './Logo';

export default function SeoLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            {/* SEO Header */}
            <nav style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', zIndex: 50 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <Logo />
                    </a>
                    <a href="/" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Join Waitlist
                    </a>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                {children}
            </main>

            {/* SEO Footer */}
            <footer style={{ padding: '3rem 0', borderTop: '1px solid #e5e7eb', marginTop: 'auto', background: '#f9fafb' }}>
                <div className="container text-center">
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                        © 2025 SwiftRead AI.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href="/" style={{ color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '0.875rem' }}>Home</a>
                        <a href="/blog/how-to-speed-read" style={{ color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '0.875rem' }}>Guide</a>
                        <a href="/tools/reading-time/atomic-habits" style={{ color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '0.875rem' }}>Tools</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
