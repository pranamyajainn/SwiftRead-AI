import React from 'react';
import founderImg from '../assets/founder.jpg';

export default function FounderStory() {
    return (
        <section className="section" style={{ background: 'white' }}>
            <div className="container">
                <div className="grid-2" style={{ alignItems: 'center' }}>
                    <div style={{ order: 2 }}>
                        <div className="founder-content" style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#111827' }}>
                                I Was a Slow Reader. <br />
                                <span className="highlight">So I Built a Machine to Fix It.</span>
                            </h2>
                            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '1.5rem' }}>
                                I used to struggle to finish one book a month. I realized the problem wasn't my focus—it was my <strong>technique</strong>.
                            </p>
                            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '2rem' }}>
                                I built this AI engine to force my eyes to move faster than my inner voice could speak. Now, I read a book a day. And you can too.
                            </p>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <strong>Shubhang Sethi</strong>
                            <div style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>Founder, Namyah</div>
                        </div>
                    </div>
                    <div style={{ order: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '400px',
                            background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            aspectRatio: '1/1'
                        }}>
                            {/* Founder Image */}
                            <img
                                src={founderImg}
                                alt="Shubhang Sethi, Founder of Namyah"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'top center'
                                }}
                            />
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'white', padding: '10px 20px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Reading Speed</div>
                                <div style={{ fontWeight: 'bold', color: '#20B2AA' }}>1200 WPM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
