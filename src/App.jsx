import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FounderStory from './components/FounderStory';
import SystemSteps from './components/SystemSteps';
import WaitlistForm from './components/WaitlistForm';
import AdminView from './components/AdminView';
import workflowImg from './assets/workflow.png';
import rocketImg from './assets/rocket.png';
import toolsImg from './assets/tools.png';
import diamondImg from './assets/diamond.png';

import Logo from './components/Logo';

function LandingPage() {
  return (
    <div>
      <nav style={{ padding: '1.5rem 0', position: 'absolute', width: '100%', top: 0, zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo />
        </div>
      </nav>

      <Hero />
      <FounderStory />
      <SystemSteps />

      {/* Workflow Section */}
      <section className="section" style={{ background: '#f0fdfa' }}>
        <div className="container">
          <div className="grid-2">
            <div className="animate-float">
              <img src={workflowImg} alt="AI Workflow" style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }} />
            </div>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>
                Your Personal <br />
                <span className="text-primary">AI Reading Coach.</span>
              </h2>
              <p style={{ marginBottom: '1rem', color: 'var(--color-text-light)', fontSize: '1.125rem' }}>
                Get early access to the tool that turns passive reading into active training. Don't just consume the book content. Internalize it.
              </p>
              <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
                {['Speed Drills', 'Comprehension Checks', 'Daily Streaks'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', fontWeight: '500' }}>
                    <span style={{ color: 'var(--color-primary)', marginRight: '0.75rem' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Early Access Section */}
      <section className="section" style={{ background: 'white', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>Why Join the Founding Members?</h2>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
                <img src={rocketImg} alt="First Mover Advantage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Skip the Line</h3>
                <p style={{ color: 'var(--color-text-light)' }}>Get the AI engine before the public. Start reading 3x faster this week.</p>
              </div>
            </div>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
                <img src={toolsImg} alt="Co-Create the Tool" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Shape the Future</h3>
                <p style={{ color: 'var(--color-text-light)' }}>Tell us what features you need. We build what our Founding Members ask for.</p>
              </div>
            </div>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
                <img src={diamondImg} alt="Lifetime Legacy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Lock in $0</h3>
                <p style={{ color: 'var(--color-text-light)' }}>Early access is free. Future versions will cost monthly. Secure your spot now.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge / Offer Section */}
      <section className="section text-center">
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>Secure Your Early Access Spot</h2>
            <p style={{ marginBottom: '3rem', color: 'var(--color-text-light)', fontSize: '1.125rem', padding: '0 1rem' }}>
              Join the 21-Day Challenge inside the app. Train with our AI, compete on the leaderboard, and double your reading speed in week 1.
            </p>

            <div id="waitlist" style={{ scrollMarginTop: '2rem' }}>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section >

      <footer style={{ padding: '4rem 0', borderTop: '1px solid #e5e7eb', marginTop: '3rem', background: 'white' }}>
        <div className="container text-center">
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: '800', fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Built by Jin Labs</p>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              SwiftRead AI is a product of <strong>Jin Labs</strong>, a premier AI agency specializing in consulting and custom AI solutions.
            </p>

          </div>
          <div style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <p>© 2025 SwiftRead AI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // SECURITY: Admin route is only available in development
  if (path === '/admin' && import.meta.env.DEV) {
    return <AdminView />;
  }

  return <LandingPage />;
}

export default App;
