# Setup Guide - Career Path Explorer

## What's Been Set Up

✅ **Database Schema** (Prisma)
- User model with authentication
- Exploration model to store career paths
- Payment model to track $1 payments

✅ **Authentication** (NextAuth.js)
- Sign up page (`/auth/signup`)
- Sign in page (`/auth/signin`)
- Password hashing with bcryptjs

✅ **API Routes**
- `/api/auth/signup` - User registration
- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/explorations` - Save/load career explorations
- `/api/checkout` - Create Stripe checkout session
- `/api/payment/check` - Check if user has paid
- `/api/webhooks/stripe` - Handle Stripe webhooks

✅ **Payment System** (Stripe)
- One-time $1 payment
- Webhook handling for payment confirmation

## Next Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Add to `.env.local`:

```env
# Database (from Neon)
DATABASE_URL=postgresql://neondb_owner:npg_3afhQ1TByjAg@ep-patient-credit-ahi9nqun-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Stripe (get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI (you already have this)
OPENAI_API_KEY=sk-...
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 4. Set Up Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your **Secret Key** (starts with `sk_test_` for test mode)
3. Create a webhook endpoint:
   - URL: `https://your-vercel-url.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`
   - Copy the **Webhook Secret** (starts with `whsec_`)

### 5. Add Environment Variables to Vercel

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all the variables from `.env.local`
3. For production, set `NEXTAUTH_URL` to your Vercel domain

### 6. Update Your Main Page

You'll need to:
1. Add authentication check
2. Add payment check before allowing exploration
3. Save explorations to database

## Testing Locally

1. Start the dev server:
```bash
pnpm dev
```

2. Visit:
   - Sign up: http://localhost:3000/auth/signup
   - Sign in: http://localhost:3000/auth/signin
   - Main app: http://localhost:3000

## Database Schema

- **User**: Stores user accounts with hashed passwords
- **Exploration**: Stores each user's career path exploration (JSON format)
- **Payment**: Tracks one-time $1 payments per user

## Payment Flow

1. User signs up/logs in
2. User clicks "Start Exploring"
3. Check if user has paid (`/api/payment/check`)
4. If not paid, redirect to Stripe checkout (`/api/checkout`)
5. After payment, Stripe webhook confirms payment
6. User can now explore career paths
7. Save exploration to database when complete

## Next: Integrate with Main Page

You'll need to:
1. Add auth check to main page
2. Add payment gate before exploration
3. Save exploration data when user completes path
4. Show user's saved explorations

