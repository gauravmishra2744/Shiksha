# Teacher Login Module - Next.js 14

A complete, production-ready teacher authentication system built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

- **Authentication**: NextAuth.js with credentials provider
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **UI**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Security**: bcrypt password hashing, rate limiting, CSRF protection
- **Theming**: Dark/light mode support
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, focus management, screen reader support

## 📁 Project Structure

```
├── app/
│   ├── (public)/teacher/          # Public auth pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (protected)/teacher/       # Protected pages
│   │   └── dashboard/
│   └── api/                       # API routes
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── auth/                      # Auth forms
│   └── shared/                    # Shared components
├── lib/                           # Utilities & config
├── prisma/                        # Database schema
└── types/                         # TypeScript definitions
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Database connection string
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET`: Random secret key for JWT signing

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Authentication Flow

1. **Registration**: `/teacher/register`
   - Validates input with Zod
   - Hashes password with bcrypt
   - Creates teacher account

2. **Login**: `/teacher/login`
   - Rate-limited login attempts
   - NextAuth credentials provider
   - JWT session management

3. **Password Reset**: `/teacher/forgot-password`
   - Generates secure reset token
   - Stores token in database
   - Sends email (placeholder implementation)

4. **Dashboard**: `/teacher/dashboard`
   - Protected route with middleware
   - Role-based access control
   - User profile and quick actions

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible design:

- **Forms**: Input, Label, Button with validation states
- **Layout**: Card, Avatar, Badge for content structure
- **Feedback**: Toast notifications for user actions
- **Theme**: Dark/light mode toggle

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: In-memory limiter for login attempts
- **CSRF Protection**: NextAuth built-in protection
- **Input Validation**: Zod schemas for all forms
- **Role-based Access**: Middleware route protection

## 📧 Email Integration

Currently uses placeholder implementation. To integrate with Resend:

1. Install Resend: `npm install resend`
2. Add `RESEND_API_KEY` to environment
3. Update `lib/email.ts` with Resend implementation

Example integration provided in comments.

## 🧪 Testing

Basic test structure included:

```bash
npm test
```

## 🚀 Production Deployment

### Database Migration

For PostgreSQL in production:

1. Update `DATABASE_URL` in `.env`
2. Update `prisma/schema.prisma` datasource to `postgresql`
3. Run migrations: `npm run db:migrate`

### Environment Variables

Ensure all production environment variables are set:
- `DATABASE_URL` (PostgreSQL connection)
- `NEXTAUTH_URL` (production domain)
- `NEXTAUTH_SECRET` (secure random string)
- `RESEND_API_KEY` (for email functionality)

### Build & Deploy

```bash
npm run build
npm start
```

## 📝 API Endpoints

- `POST /api/teacher/register` - Create teacher account
- `POST /api/teacher/forgot-password` - Request password reset
- `POST /api/teacher/reset-password` - Reset password with token
- `GET /api/teacher/profile` - Get teacher profile (protected)

## 🎯 Next Steps

1. **Email Service**: Integrate Resend or similar provider
2. **Testing**: Add comprehensive test coverage
3. **Monitoring**: Add error tracking and analytics
4. **Features**: Expand dashboard functionality
5. **Performance**: Add caching and optimization

## 📄 License

MIT License - feel free to use in your projects!