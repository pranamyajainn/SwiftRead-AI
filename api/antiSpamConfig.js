// Anti-Spam Configuration
// Centralized thresholds and settings for the signup process.

export const CONFIG = {
    // Rate Limiting
    MAX_SIGNUPS_PER_HOUR_PER_IP: 3,

    // Input Constraints
    MAX_NAME_LENGTH: 50,
    MAX_EMAIL_LENGTH: 100,

    // Honeypot
    HONEYPOT_FIELD_NAME: 'website',

    // Disposable Email Blocklist
    // Add new domains here to block them
    DISPOSABLE_EMAIL_DOMAINS: [
        'tempmail.com',
        '10minutemail.com',
        'guerrillamail.com',
        'mailinator.com',
        'yopmail.com',
        'sharklasers.com',
        'throwawaymail.com'
    ]
};
