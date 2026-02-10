# BioXLab - Medical Laboratory Management System

A modern medical laboratory management system built with Next.js 15, PostgreSQL, Prisma, and NextAuth.js.

## Features

- 🔐 Secure authentication with NextAuth.js (credentials provider)
- 💾 PostgreSQL database with Prisma ORM
- 🧪 Test catalog management with categories
- 📅 Booking system for lab tests
- 🏢 Multiple lab branch support
- 👥 User and admin role management
- 📊 Test results tracking
- 🎨 Modern UI with Tailwind CSS and shadcn/ui

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL 17
- **ORM**: Prisma 5.22.0
- **Authentication**: NextAuth.js with bcrypt
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 17 installed and running
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd losalamos-laboratory
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:your-password@localhost:5432/bioxlab"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Set up the database:
   ```bash
   # Create the database
   createdb bioxlab

   # Run the complete setup SQL (includes migrations and test data)
   psql -U postgres -d bioxlab -f migrations/complete_setup.sql
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Login Credentials

- **Admin**: admin@bioxlab.com / admin123
- **User**: user@bioxlab.com / user123

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth-pages)/      # Authentication pages
│   ├── (protected)/       # Protected routes (dashboard, etc.)
│   ├── (public)/          # Public pages
│   └── api/               # API routes with Prisma
├── components/            # React components
├── lib/                   # Utility libraries (Prisma, auth)
├── prisma/               # Prisma schema
├── migrations/           # Database migrations
├── providers/            # React context providers
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Database Schema

The application uses the following main tables:
- `users` - User accounts with authentication
- `test_category` - Test categories
- `tests` - Available lab tests
- `lab_branches` - Laboratory branch locations
- `bookings` - Test bookings
- `tests_bookings` - Junction table for booked tests
- `accounts`, `sessions`, `verification_tokens` - NextAuth.js tables

## API Routes

All API routes are located in `app/api/` and use Prisma for database operations:
- `/api/tests` - CRUD operations for tests
- `/api/test-categories` - CRUD operations for categories
- `/api/lab-branches` - CRUD operations for lab branches
- `/api/bookings` - CRUD operations for bookings
- `/api/tests-bookings` - Manage test-booking relationships
- `/api/auth/[...nextauth]` - NextAuth.js authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
