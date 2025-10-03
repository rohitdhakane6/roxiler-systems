# Roxiler Systems

A comprehensive multi-role management system built with modern web technologies. This project provides role-based access control for Admin, Store Owners, and Users with a complete store rating and management system.

## 🌐 Live Demo

[**View Live Application**](https://roxiler-systems-web.vercel.app) - Experience the full application with all features

> **Note**: The backend is hosted on Render and may take a moment to boot up on first access. Please be patient if the initial load takes a few seconds.

## 🔑 Test Credentials

For testing purposes, you can use these pre-seeded accounts:

### Admin Account

- **Email**: `admin@example.com`
- **Password**: `User@123`
- **Access**: Full administrative control over users and stores

### Store Owner Account

- **Email**: `owner1@example.com`
- **Password**: `User@123`
- **Access**: Manage store details and view ratings

### Regular User Account

- **Email**: `user1@example.com`
- **Password**: `User@123`
- **Access**: Browse stores, rate them, and manage profile

> **Note**: All seeded users use the same password `User@123` for easy testing.

## 🚀 Features

### Core Features

- **Multi-Role Authentication System** - Admin, Store Owner, and User roles with different permissions
- **Store Management** - Create, manage, and rate stores
- **Rating System** - Users can rate stores with 1-5 star ratings
- **Admin Dashboard** - Complete administrative control over users and stores
- **Store Owner Dashboard** - Manage store details and view ratings
- **User Dashboard** - Browse stores, rate them, and manage profile

### Technical Features

- **TypeScript** - Full type safety across frontend and backend
- **Modern React** - React 19 with React Router for navigation
- **TailwindCSS** - Utility-first CSS with custom design system
- **shadcn/ui** - Beautiful, accessible UI components
- **Express.js** - Fast, scalable backend API
- **Drizzle ORM** - TypeScript-first database ORM
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure token-based authentication
- **Form Validation** - Zod schema validation
- **Monorepo Architecture** - Turborepo for optimized builds
- **Bun Runtime** - Fast JavaScript runtime and package manager

## 🛠️ Local Setup

### Prerequisites

- [Bun](https://bun.sh) (v1.2.22 or higher)
- [PostgreSQL](https://www.postgresql.org) (v12 or higher)
- Node.js (v18 or higher) - for compatibility

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd roxiler-systems
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Environment Setup**

   Create a `.env` file in `apps/server/`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/roxiler_systems"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Database Setup**

   ```bash
   # Push schema to database
   bun db:push

   # Seed the database with initial data
   bun db:seed
   ```

5. **Start Development Servers**

   ```bash
   # Start both frontend and backend
   bun dev

   # Or start individually
   bun dev:web    # Frontend only (http://localhost:5173)
   bun dev:server # Backend only (http://localhost:3000)
   ```

## 📁 Project Structure

```
roxiler-systems/
├── apps/
│   ├── web/                    # Frontend React Application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── admin/      # Admin-specific components
│   │   │   │   ├── owner/      # Store owner components
│   │   │   │   ├── user/       # User-specific components
│   │   │   │   ├── data-table/ # Data table components
│   │   │   │   └── ui/         # Base UI components (shadcn/ui)
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── pages/          # Page components
│   │   │   │   └── auth/       # Authentication pages
│   │   │   ├── utils/          # Utility functions
│   │   │   └── types/          # TypeScript type definitions
│   │   └── package.json
│   └── server/                 # Backend Express API
│       ├── src/
│       │   ├── controllers/    # Route controllers
│       │   ├── db/            # Database configuration
│       │   │   ├── schema/    # Drizzle schema definitions
│       │   │   └── migrations/ # Database migrations
│       │   ├── lib/           # Utility libraries
│       │   ├── middleware/    # Express middleware
│       │   ├── routers/       # API route definitions
│       │   └── types/         # TypeScript type definitions
│       └── package.json
├── packages/
│   └── common/                # Shared types and schemas
│       ├── src/
│       │   └── index.ts       # Shared Zod schemas and types
│       └── package.json
├── package.json              # Root package.json
├── turbo.json               # Turborepo configuration
└── README.md
```

## 🗄️ Database Schema

### Tables

- **users** - User accounts with role-based access (ADMIN, USER, STORE_OWNER)
- **stores** - Store information linked to store owners
- **ratings** - User ratings for stores (1-5 stars, one rating per user per store)

### Key Features

- UUID primary keys for all tables
- Foreign key constraints with cascade deletes
- Unique constraints to prevent duplicate ratings
- Timestamps for audit trails
- Role-based access control

## 🚀 Available Commands

### Development

```bash
bun dev              # Start all applications in development mode
bun dev:web          # Start only the frontend (port 5173)
bun dev:server       # Start only the backend (port 3000)
```

### Building

```bash
bun build            # Build all applications for production
bun check-types      # Type check all TypeScript files
```

### Database

```bash
bun db:push          # Push schema changes to database
bun db:studio        # Open Drizzle Studio (database GUI)
bun db:generate      # Generate new migration files
bun db:migrate       # Run pending migrations
bun db:seed          # Seed database with initial data
```

### Utilities

```bash
bun lint             # Lint all applications
bun compile          # Compile server to binary (server only)
```

## 🔐 Authentication & Authorization

### User Roles

- **ADMIN**: Full system access, can manage users and stores
- **STORE_OWNER**: Can manage their own store and view ratings
- **USER**: Can browse stores, rate them, and manage their profile

### Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based route protection
- Input validation with Zod schemas
- CORS protection

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Admin Routes

- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `GET /api/admin/stores` - Get all stores
- `POST /api/admin/stores` - Create new store

### Store Routes

- `GET /api/stores` - Get all stores (with search)
- `GET /api/stores/:id` - Get store details
- `POST /api/stores/:id/rate` - Rate a store

### User Routes

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Update password
