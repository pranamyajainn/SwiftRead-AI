import React from 'react';

export default function Logo({ className, style }) {
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', ...style }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="#20B2AA" fillOpacity="0.1" />
                <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20V28H20C15.5817 28 12 24.4183 12 20Z" fill="#20B2AA" />
                <path d="M28 20C28 24.4183 24.4183 28 20 28H28V20Z" fill="#178a84" />
                <path d="M20 12L28 20H20V12Z" fill="#FDE047" />
            </svg>
            <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#1F2937' }}>
                SwiftRead <span style={{ color: '#20B2AA' }}>AI</span>
            </span>
        </div>
    );
}
