import React from 'react';
import step1 from '../assets/step1.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import step4 from '../assets/step4.png';

const steps = [
    {
        id: 1,
        title: "The Pacer",
        desc: "Stops you from reading word-by-word. Guides your eyes to scan entire lines instantly.",
        img: step1
    },
    {
        id: 2,
        title: "The Trainer",
        desc: "Gamified drills that break the habit of \"saying\" words in your head.",
        img: step2
    },
    {
        id: 3,
        title: "The Filter",
        desc: "AI instantly finds the \"Golden Nuggets\"—the 20% of the book that holds 80% of the value.",
        img: step3
    },
    {
        id: 4,
        title: "The Lock",
        desc: "Automated quizzes ensure you actually remember what you read.",
        img: step4
    }
];

export default function SystemSteps() {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Inside the <span className="highlight">Speed Reading Engine</span></h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)', padding: '0 1rem' }}>
                        This isn't a video course. It's a software suite designed to upgrade your biological hardware.
                    </p>
                </div>

                <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {steps.map((step) => (
                        <div key={step.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
                                <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--color-bg)',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-primary)'
                                }}>
                                    STEP 0{step.id}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
