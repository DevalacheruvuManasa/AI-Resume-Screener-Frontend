// File: src/Pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
// The import for Header has been removed.

export default function HomePage() {
    // The Header is removed from here, as the parent Layout component will render it.
    return (
        <main className="hero-section">
            <h1>The Future of Hiring is Here!</h1>
            <p className="subtitle">
                Leverage the power of AI to analyze resumes, score candidates, and find the perfect fit—faster than ever before.
            </p>
            <Link to="/register" className="btn-cta">Start Screening for Free</Link>
        </main>
    );
}