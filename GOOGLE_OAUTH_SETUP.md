# Google OAuth Setup Guide

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" or "Google Identity"
   - Click **Enable**

4. Create OAuth 2.0 Credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - If prompted, configure OAuth consent screen first:
     - User Type: **External** (for testing) or **Internal** (for Google Workspace)
     - App name: "Career Path Explorer"
     - User support email: Your email
     - Developer contact: Your email
     - Click **Save and Continue**
     - Scopes: Click **Save and Continue** (default is fine)
     - Test users: Add your email for testing
     - Click **Save and Continue**

5. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Career Path Explorer"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for local development)
     - `https://your-vercel-url.vercel.app` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for local)
     - `https://your-vercel-url.vercel.app/api/auth/callback/google` (for production)
   - Click **Create**

6. Copy your credentials:
   - **Client ID** (starts with something like `123456789-abc...`)
   - **Client Secret** (starts with `GOCSPX-...`)

## Step 2: Add to Environment Variables

Add these to your `.env.local` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

Also add to Vercel:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. Make sure to add them for **Production**, **Preview**, and **Development**

## Step 3: Update Redirect URIs for Production

When you deploy to Vercel:
1. Go back to Google Cloud Console
2. Edit your OAuth 2.0 Client ID
3. Add your production URL to:
   - Authorized JavaScript origins: `https://your-vercel-url.vercel.app`
   - Authorized redirect URIs: `https://your-vercel-url.vercel.app/api/auth/callback/google`

## Step 4: Test

1. Start your dev server: `pnpm dev`
2. Go to `http://localhost:3000/auth/signin`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected back to the home page

## Troubleshooting

**Error: "redirect_uri_mismatch"**
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check for trailing slashes or http vs https

**Error: "access_denied"**
- Make sure you added your email as a test user in OAuth consent screen
- Or publish your app (for production)

**Error: "invalid_client"**
- Double-check your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`
- Make sure there are no extra spaces or quotes

