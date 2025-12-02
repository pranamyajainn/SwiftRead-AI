# Operations Manual: SwiftRead AI Waitlist

This document explains how the waitlist system works, how to configure it, and how to troubleshoot common issues.

## System Overview

The waitlist is a simple React frontend backed by Vercel Serverless Functions and a Vercel Postgres database.

- **Frontend**: `src/components/WaitlistForm.jsx` (Form UI)
- **Backend**: `api/signup.js` (Signup Logic)
- **Config**: `api/antiSpamConfig.js` (Settings)
- **Database**: Postgres (Table: `signups`)

## Configuration

All anti-spam thresholds and settings are centralized in `api/antiSpamConfig.js`.

### Changing Thresholds
To adjust limits, edit `api/antiSpamConfig.js` and redeploy.

```javascript
export const CONFIG = {
  // Max signups allowed from one IP per hour
  MAX_SIGNUPS_PER_HOUR_PER_IP: 3,

  // Max characters for inputs
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100,

  // Name of the hidden honeypot field
  HONEYPOT_FIELD_NAME: 'website',

  // List of blocked email domains
  DISPOSABLE_EMAIL_DOMAINS: [
    'tempmail.com',
    '10minutemail.com',
    // ... add more here
  ]
};
```

## Anti-Spam Defenses

### 1. Honeypot
**How it works**: A hidden input field named `website` (configurable) is present in the form. Real users don't see it. Bots often fill it.
**Action**: If filled, the server logs `[SPAM] Honeypot triggered` and returns `200 OK` (Success) to trick the bot into thinking it succeeded. The data is **NOT** saved.

### 2. Rate Limiting
**How it works**: The server counts how many signups have occurred from the requestor's IP address in the last hour.
**Action**: If the count exceeds `MAX_SIGNUPS_PER_HOUR_PER_IP` (default 3), the server returns `429 Too Many Requests`.

### 3. Disposable Email Block
**How it works**: The server checks the domain of the email address against `DISPOSABLE_EMAIL_DOMAINS`.
**Action**: If matched, the server logs `[SPAM] Disposable email blocked` and returns `400 Bad Request` with a generic "Invalid email address" message.

### 4. Silent Deduplication
**How it works**: The database enforces unique emails.
**Action**: If a user tries to sign up with an existing email, the server catches the error, logs `[INFO] Duplicate signup attempt`, and returns `200 OK` (Success). This prevents attackers from enumerating valid emails.

## Logging & Monitoring

Logs are available in the **Vercel Dashboard > Logs**.

We log the following events (without PII):
- `[SPAM] Honeypot triggered by IP: <IP>`
- `[SPAM] Disposable email blocked: <DOMAIN>`
- `[RATE_LIMIT] IP <IP> exceeded limit`
- `[INFO] Duplicate signup attempt`
- `Database error: <ERROR>`

## Troubleshooting

### Valid User Cannot Signup
- **Check Rate Limit**: Did they try too many times? Ask them to wait an hour.
- **Check Blocklist**: Is their email domain in `DISPOSABLE_EMAIL_DOMAINS`? Remove it if it's legitimate.
- **Check Logs**: Look for specific error messages in Vercel logs.

### Spam is Getting Through
- **Update Blocklist**: Add the spam domain to `DISPOSABLE_EMAIL_DOMAINS`.
- **Tighten Rate Limit**: Reduce `MAX_SIGNUPS_PER_HOUR_PER_IP` to 1 or 2.
- **Check Honeypot**: Ensure bots aren't bypassing the form (e.g., using headless browsers that don't fill hidden fields).

## Enabling SEO Router (Manual Activation)

The project includes an SEO Router (`src/Router.jsx`) that supports `/blog` and `/tools` paths. It is currently **disabled**.

To enable it:
1.  Open `src/main.jsx`.
2.  Import `Router` from `./Router`.
3.  Replace `<App />` with `<Router />` inside `createRoot`.

**Warning**: Do not enable without testing. This changes the root routing logic.

## Deployment

Any changes to `api/` or `src/` require a redeploy to take effect.
```bash
npx vercel deploy --prod
```
