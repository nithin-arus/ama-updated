# Google OAuth Setup Guide

Follow these steps to enable "Sign in with Google" functionality.

## Part 1: Create Google OAuth Application

### Step 1: Go to Google Cloud Console
1. Open https://console.cloud.google.com/
2. Sign in with your Google account

### Step 2: Create or Select a Project
1. Click the project dropdown at the top
2. Click **"New Project"**
3. Enter project name: `AMA Career Platform`
4. Click **"Create"**
5. Wait for the project to be created, then select it

### Step 3: Enable Google+ API (if needed)
1. In the sidebar, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click it and then click **"Enable"** (if not already enabled)

### Step 4: Configure OAuth Consent Screen
1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **"External"** user type
3. Click **"Create"**
4. Fill in the required fields:
   - **App name**: AMA Career Platform
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click **"Save and Continue"**
6. On **Scopes** page, click **"Save and Continue"** (use defaults)
7. On **Test users** page, click **"Save and Continue"** (optional)
8. Click **"Back to Dashboard"**

### Step 5: Create OAuth Client ID
1. Go to **APIs & Services** > **Credentials**
2. Click **"Create Credentials"** > **"OAuth client ID"**
3. Choose **"Web application"**
4. Fill in:
   - **Name**: AMA Career Platform Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for local development)
     - Your Supabase URL: `https://YOUR_PROJECT_ID.supabase.co`
   - **Authorized redirect URIs**:
     - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

   **IMPORTANT**: Replace `YOUR_PROJECT_ID` with your actual Supabase project ID!

5. Click **"Create"**
6. A popup will show your **Client ID** and **Client Secret**
7. **COPY BOTH VALUES** - you'll need them in the next step!

## Part 2: Configure Google OAuth in Supabase

### Step 1: Go to Supabase Authentication Settings
1. In your Supabase dashboard, go to **Authentication** (left sidebar)
2. Click **"Providers"**
3. Find **"Google"** in the list

### Step 2: Enable Google Provider
1. Click on **Google** to expand it
2. Toggle **"Enable Sign in with Google"** to ON
3. Paste your Google OAuth credentials:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
4. Click **"Save"**

### Step 3: Update Redirect URL in Google Cloud
1. Go back to Google Cloud Console
2. Go to **APIs & Services** > **Credentials**
3. Click on your OAuth client ID
4. Under **Authorized redirect URIs**, make sure you have:
   - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
5. Click **"Save"**

## Part 3: Test Google OAuth

### In Your Application
1. Make sure your `.env.local` has correct Supabase credentials
2. Restart your dev server: `npm run dev`
3. Open http://localhost:3000
4. Click **"Sign In"**
5. Click **"Sign in with Google"**
6. You should be redirected to Google sign-in
7. After signing in, you'll be redirected back to your dashboard

## Troubleshooting

### Error: "redirect_uri_mismatch"
**Problem**: The redirect URI doesn't match what's configured in Google Cloud Console.

**Solution**:
1. Copy the exact redirect URI from the error message
2. Go to Google Cloud Console > Credentials
3. Add that exact URI to "Authorized redirect URIs"
4. Wait 5 minutes for changes to propagate
5. Try again

### Error: "Access blocked: This app's request is invalid"
**Problem**: OAuth consent screen not configured properly.

**Solution**:
1. Go to Google Cloud Console > OAuth consent screen
2. Make sure app name, support email, and developer contact are filled
3. Save changes and try again

### Error: "Invalid OAuth client"
**Problem**: Client ID or Client Secret is incorrect.

**Solution**:
1. Go to Google Cloud Console > Credentials
2. Click on your OAuth client ID
3. Copy the Client ID and Client Secret again
4. Paste them in Supabase Settings > Authentication > Providers > Google
5. Click Save
6. Try again

### Users Can't Sign In (App not verified)
**Problem**: For production, Google requires app verification.

**Solution** (for development):
- Your app will show a warning "This app isn't verified"
- Click "Advanced" > "Go to AMA Career Platform (unsafe)"
- This is normal for development

**Solution** (for production):
- Submit your app for verification at Google Cloud Console
- This process can take a few days
- Not required for development/testing

## Production Deployment

When deploying to production (Vercel, etc.):

1. Update **Authorized JavaScript origins** in Google Cloud:
   - Add your production URL: `https://your-domain.com`

2. Update **Authorized redirect URIs**:
   - Keep Supabase redirect URI
   - Redirect URI stays the same (it's the Supabase URL, not your app URL)

3. Update site URL in Supabase:
   - Go to Supabase > Authentication > URL Configuration
   - Set **Site URL** to your production domain

## Security Best Practices

1. ✅ Never expose Client Secret in client-side code (it's server-side only in Supabase)
2. ✅ Use HTTPS in production (required by Google)
3. ✅ Keep your OAuth credentials secret
4. ✅ Rotate credentials if they're ever exposed
5. ✅ Use different OAuth clients for dev/staging/production environments

## Verification

After setup, verify everything works:
- [ ] Can click "Sign in with Google" without errors
- [ ] Google sign-in page appears
- [ ] After signing in with Google, redirected to dashboard
- [ ] User profile created in Supabase
- [ ] Session persists across page refreshes

## Done! 🎉

Your Google OAuth is now configured and users can sign in with their Google accounts!
