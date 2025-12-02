import React, { useEffect } from 'react';
import SeoLayout from '../../components/SeoLayout';
import WaitlistForm from '../../components/WaitlistForm';

export default function SpeedReadingGuide() {
    useEffect(() => {
        // SEO Metadata
        document.title = "How to Speed Read: 3x Your Learning | SwiftRead AI";

        // Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Learn the science-backed method to read 3x faster without losing comprehension.";

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = "https://waitlist.namyah.com/blog/how-to-speed-read";
    }, []);

    return (
        <SeoLayout>
            <article className="container" style={{ maxWidth: '800px', padding: '4rem 1rem' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>
                        Ultimate Guide
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                        How to Speed Read: The Scientific Method to 3x Your Learning
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)' }}>
                        Stop subvocalizing. Start scanning. Here is the proven framework used by polymaths and CEOs.
                    </p>
                </header>

                <div className="prose" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151' }}>
                    <p>
                        Reading is the meta-skill of the 21st century. But most of us read at the same speed we speak: <strong>200 words per minute (WPM)</strong>.
                        This is called <em>subvocalization</em>—saying the words in your head as you read them.
                    </p>

                    <h2 style={{ fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem', color: '#111827' }}>The Problem: Subvocalization</h2>
                    <p>
                        Your brain can process visual information 60,000x faster than text. But your "inner voice" bottlenecks you.
                        To read faster, you must decouple your visual cortex from your auditory loop.
                    </p>

                    <div style={{ background: '#f0fdfa', padding: '2rem', borderRadius: '1rem', margin: '3rem 0', border: '1px solid #ccfbf1' }}>
                        <h3 style={{ marginTop: 0, color: '#0f766e' }}>Want to break the 200 WPM barrier?</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            SwiftRead AI uses bionic highlighting to guide your eyes and silence your inner voice automatically.
                        </p>
                        <a href="/" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Join the Waitlist
                        </a>
                    </div>

                    <h2 style={{ fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem', color: '#111827' }}>Technique 1: The Pacer Method</h2>
                    <p>
                        Use your finger or a pen to guide your eyes. Move it consistently across the line. Do not stop. Do not go back.
                        This forces your eyes to keep up with the pacer, reducing <em>regression</em> (re-reading).
                    </p>

                    <h2 style={{ fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem', color: '#111827' }}>Technique 2: Peripheral Expansion</h2>
                    <p>
                        Don't look at the first or last word of a line. Your peripheral vision can pick them up.
                        Focus on the center 60% of the page. This reduces the distance your eyes have to travel.
                    </p>
                </div>

                <section style={{ marginTop: '5rem', borderTop: '1px solid #e5e7eb', paddingTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Ready to Train Your Brain?</h2>
                    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <WaitlistForm />
                    </div>
                </section>
            </article>
        </SeoLayout>
    );
}
