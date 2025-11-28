# SwiftRead AI - Landing Page

This is the public landing page and waitlist for **SwiftRead AI**, a tool designed to turn passive reading into active training using AI.

## Project Overview

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (responsive, modern design)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Postgres (via Vercel/Supabase)

## Features

- **Waitlist Form**: Captures user name and email.
- **Responsive Design**: Works seamlessly on mobile and desktop.
- **Animations**: Subtle micro-animations and confetti celebration on signup.
- **Admin Dashboard**: (Development only) View and export signups.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/swift-read-ai.git
    cd swift-read-ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

To run the project locally with full functionality (including the database), you need to set up a `.env.local` file in the root directory.

Required variable:
```env
POSTGRES_URL_NON_POOLING=postgres://user:password@host:port/database
```
*Note: This project uses the `pg` client with SSL enabled (`rejectUnauthorized: false`) to connect to Postgres instances.*

### Running Locally

Start the development server:

```bash
npm run dev
```

- **Landing Page**: `http://localhost:5173`
- **Admin Dashboard**: `http://localhost:5173/admin` (Only available in development mode)

### Building for Production

To create a production build:

```bash
npm run build
```

This will generate the `dist` folder. Note that the `/admin` route is **disabled** in production builds for security.

## Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `POSTGRES_URL_NON_POOLING` environment variable in the Vercel project settings.
4.  Deploy!

## Security

- **No Secrets**: This repository contains no API keys or passwords.
- **Admin Access**: The admin dashboard and API endpoints are restricted to the `development` environment. They are not accessible in the production deployment.

## License

© 2025 SwiftRead AI. All rights reserved.
