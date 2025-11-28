import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../styles/celebration.css';

export default function WaitlistForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState(''); // Anti-spam field
    const [submitted, setSubmitted] = useState(false);
    const [lastSubmitted, setLastSubmitted] = useState(0);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // Disable scrolling when celebration is active
    useEffect(() => {
        if (submitted) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [submitted]);

    const triggerCelebration = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#20B2AA', '#FDE047', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#20B2AA', '#FDE047', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 1. Honeypot Check
        if (honeypot) {
            console.log('Spam detected');
            return; // Silently fail
        }

        // 2. Email Validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // 3. Rate Limiting (10 seconds)
        const now = Date.now();
        if (now - lastSubmitted < 10000) {
            setError('Please wait a few seconds before adding another person.');
            return;
        }

        // 4. Max Submissions (5 per session)
        if (submissionCount >= 5) {
            setError('You have reached the maximum number of signups for this session.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    honeypot, // Send to server for logging/verification
                    date: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                let errorMessage = 'Something went wrong';
                try {
                    const data = await response.json();
                    errorMessage = data.error || errorMessage;
                } catch (e) {
                    // If response is not JSON (e.g. 500 server crash), read text or use default
                    console.error('Failed to parse error response:', e);
                    errorMessage = `Server Error (${response.status})`;
                }
                throw new Error(errorMessage);
            }

            setIsLoading(false);
            setSubmitted(true);
            setLastSubmitted(now);
            setSubmissionCount(prev => prev + 1);
            triggerCelebration();

            // Reset form data
            setName('');
            setEmail('');
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    const BalloonLayer = () => {
        const balloons = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            color: ['#20B2AA', '#FDE047', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 4)],
            speed: 4 + Math.random() * 4
        }));

        return (
            <div className="balloon-container">
                {balloons.map(b => (
                    <div
                        key={b.id}
                        className="balloon"
                        style={{
                            left: `${b.left}%`,
                            animationDelay: `${b.delay}s`,
                            animationDuration: `${b.speed}s`,
                            backgroundColor: b.color,
                            boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.1)`
                        }}
                    />
                ))}
            </div>
        );
    };

    if (submitted) {
        return (
            <div className="celebration-overlay">
                <BalloonLayer />

                <div className="success-card-enter">
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1F2937' }}>
                        You're on the list.
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#6B7280', marginBottom: '2rem' }}>
                        Your spot is reserved.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Add Another Person
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <form onSubmit={handleSubmit}>
                {/* Honeypot Field - Hidden from users */}
                <div style={{ display: 'none' }}>
                    <label>Website</label>
                    <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex="-1"
                        autoComplete="off"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>First Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Warren"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb',
                            fontSize: '1rem',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="warren@berkshire.com"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb',
                            fontSize: '1rem',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    />
                </div>

                {error && (
                    <div style={{ marginBottom: '1rem', color: '#ef4444', fontSize: '0.875rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.25rem' }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Securing Spot...' : 'Secure My Free Spot'}
                </button>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4b5563', textAlign: 'center', fontWeight: '500' }}>
                    Join <span style={{ color: '#20B2AA', fontWeight: 'bold' }}>450+ early adopters</span> on the list.
                </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-light)', textAlign: 'center' }}>
                    We respect your inbox. Unsubscribe at any time.
                </p>
            </form>
        </div>
    );
}
