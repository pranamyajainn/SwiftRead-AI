import React, { useState, useEffect } from 'react';
import App from './App'; // The main Landing Page
import SpeedReadingGuide from './pages/seo/SpeedReadingGuide';
import BookTimeTemplate from './pages/seo/BookTimeTemplate';

// Simple data source for the programmatic pages
const BOOKS = {
    'atomic-habits': {
        bookTitle: 'Atomic Habits',
        author: 'James Clear',
        wordCount: 80000
    },
    'harry-potter': {
        bookTitle: "Harry Potter and the Sorcerer's Stone",
        author: 'J.K. Rowling',
        wordCount: 77000
    },
    'deep-work': {
        bookTitle: 'Deep Work',
        author: 'Cal Newport',
        wordCount: 65000
    },
    'thinking-fast-and-slow': {
        bookTitle: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        wordCount: 160000
    }
};

const GENERIC_BOOK = {
    bookTitle: 'this book',
    author: 'the author',
    wordCount: 80000
};

export default function Router() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onPopState = () => setPath(window.location.pathname);
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    // SEO: Blog Pillar Page
    if (path === '/blog/how-to-speed-read') {
        return <SpeedReadingGuide />;
    }

    // SEO: Programmatic Pages
    if (path.startsWith('/tools/reading-time/')) {
        const slug = path.split('/').pop();
        const bookData = BOOKS[slug] || GENERIC_BOOK;

        return (
            <BookTimeTemplate
                bookTitle={bookData.bookTitle}
                author={bookData.author}
                wordCount={bookData.wordCount}
                slug={slug}
            />
        );
    }

    // Default: Landing Page (Waitlist)
    return <App />;
}
