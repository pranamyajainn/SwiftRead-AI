import React, { useEffect } from 'react';
import SeoLayout from '../../components/SeoLayout';

export default function BookTimeTemplate({
    bookTitle = "Atomic Habits",
    author = "James Clear",
    wordCount = 80000,
    slug = "atomic-habits"
}) {
    const avgSpeed = 200; // WPM
    const swiftSpeed = 600; // WPM

    const avgTimeHours = (wordCount / avgSpeed / 60).toFixed(1);
    const swiftTimeHours = (wordCount / swiftSpeed / 60).toFixed(1);
    const savedHours = (avgTimeHours - swiftTimeHours).toFixed(1);

    useEffect(() => {
        // SEO Metadata
        document.title = `How Long to Read ${bookTitle}? | SwiftRead AI`;

        // Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = `See how long it takes to read ${bookTitle} at normal speed vs with SwiftRead AI.`;

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = `https://waitlist.namyah.com/tools/reading-time/${slug}`;
    }, [bookTitle, slug]);

    return (
        <SeoLayout>
            <article className="container" style={{ maxWidth: '800px', padding: '4rem 1rem' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>
                        How long to read <span className="text-primary">{bookTitle}</span>?
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--color-text-light)' }}>
                        by {author}
                    </p>
                </header>

                <div className="grid-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>AVERAGE READER</div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: '#374151' }}>{avgTimeHours} hrs</div>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>at 200 WPM</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem', border: '2px solid var(--color-primary)', background: '#f0fdfa' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>WITH SWIFTREAD</div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-primary)' }}>{swiftTimeHours} hrs</div>
                        <p style={{ fontSize: '0.875rem', color: '#0f766e' }}>at 600 WPM</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        You could save <span className="highlight">{savedHours} hours</span> on this book alone.
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Imagine what you could learn with that extra time. SwiftRead AI trains your brain to process text 3x faster without losing comprehension.
                    </p>
                    <a href="/" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                        Start Reading Faster
                    </a>
                </div>

                <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>About {bookTitle}</h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                        {bookTitle} is a popular book by {author} with approximately {wordCount.toLocaleString()} words.
                        For the average person, it is a significant time investment.
                        However, speed reading techniques can drastically reduce this time, allowing you to consume the key insights in a fraction of the time.
                    </p>
                </div>
            </article>
        </SeoLayout>
    );
}
