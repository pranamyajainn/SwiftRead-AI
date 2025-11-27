# SwiftRead AI - Landing Page

A high-performance, conversion-optimized landing page for the SwiftRead AI speed reading tool. Built with React, Vite, and Vanilla CSS, designed to capture early access signups with a premium, Ogilvy-inspired aesthetic.

## 🚀 Project Overview

*   **Goal**: Drive waitlist signups for the upcoming AI reading engine.
*   **Key Features**:
    *   **AI-First Messaging**: "Read Like a Billionaire. 1000 Pages a Day."
    *   **Waitlist System**: LocalStorage-based signup tracking with rate limiting and spam protection.
    *   **Admin Dashboard**: Hidden view (`/admin`) to view and export signups.
    *   **Celebration Effects**: Confetti and balloon animations on successful signup.
    *   **Mobile Responsive**: Fully optimized for all device sizes.

## 🛠 Quickstart Guide

### Prerequisites
*   Node.js (v16+)
*   npm (v7+)

### Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install
```

### Development
```bash
# Start the local development server
npm run dev
```
Access the app at `http://localhost:5173`.

### Build for Production
```bash
# Create a production build
npm run build
```
The output will be in the `dist` directory.

## 🔐 Admin Access

To view the waitlist signups:
1.  Navigate to `/admin` (e.g., `https://your-site.com/admin`).
2.  Enter the password: **`munnu123`**
3.  From the dashboard, you can view the list or download a CSV.

## 📂 File Structure

```
src/
├── assets/          # Images and icons
├── components/      # React components
│   ├── Hero.jsx     # Main landing section
│   ├── WaitlistForm.jsx # Signup form with logic
│   ├── AdminView.jsx    # Hidden dashboard
│   └── ...
├── App.jsx          # Main layout and routing
├── index.css        # Global styles and variables
└── main.jsx         # Entry point
```

## 🌍 Deployment

### Netlify / Vercel (Recommended)
1.  Connect your GitHub repository.
2.  Set the build command to `npm run build`.
3.  Set the publish directory to `dist`.
4.  **Important**: Ensure your host redirects all 404s to `index.html` to support the `/admin` route (SPA routing).

### GitHub Pages
1.  Update `vite.config.js` to set `base: '/<repo-name>/'`.
2.  Deploy the `dist` folder.
3.  Note: The `/admin` route might require a hash router or `404.html` hack on GitHub Pages.

## 📱 Mobile & Performance

*   **Responsiveness**: Tested on devices down to 320px width.
*   **Animations**: Celebration effects use `canvas-confetti` and CSS animations, optimized to degrade gracefully.
*   **Performance**: Zero blocking scripts, lazy-loaded assets where possible.

## ⚠️ Known Limitations

*   **Data Persistence**: Signups are currently stored in the browser's `localStorage`. This is a demo/MVP feature. For a real launch, connect `WaitlistForm.jsx` to a backend API (e.g., Supabase, Firebase).
*   **Legal Links**: The Privacy Policy and Terms links in the footer are placeholders (`#`).

## 🤝 Contribution

1.  Fork the repo.
2.  Create a feature branch.
3.  Submit a Pull Request.
