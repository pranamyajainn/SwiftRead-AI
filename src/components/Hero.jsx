import React from 'react';
import heroImg from '../assets/hero.png';

export default function Hero() {
    const scrollToWaitlist = () => {
        document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="section" style={{ minHeight: '80vh', paddingTop: '7rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="grid-2">
                    <div>
                        <div className="text-primary" style={{ fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            AI-Powered Speed Reading
                        </div>
                        <h1>
                            Read Like a Billionaire. <br />
                            <span className="highlight">1000 Pages a Day.</span>
                        </h1>
                        <p className="subheadline" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4b5563' }}>
                            The AI Engine That Trains Your Brain to Read 3x Faster.
                        </p>

                        <p style={{ fontSize: '0.875rem', color: '#20B2AA', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Based on neuroplasticity research used by Ivy League learning labs
                        </p>

                        <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Stop reading word-by-word. Our AI gamifies the process, upgrading your brain to scan books in hours, not weeks.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                            <a
                                href="#waitlist"
                                className="btn btn-primary"
                                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Get Early Access
                            </a>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                            <span style={{ color: '#20B2AA' }}>✓</span>
                            <span>Accepting early access requests</span>
                        </div>
                    </div>
                    <div className="animate-float">
                        <img
                            src={heroImg}
                            alt="Speed Reading Visualization"
                            style={{ width: '100%', height: 'auto', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
