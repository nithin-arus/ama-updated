# Supabase Setup Guide

This guide will help you set up Supabase for the AMA Career Platform to enable authentication and data persistence.

## Why Supabase?

Supabase provides:
- **User Authentication** - Sign-in with email/password and Google OAuth
- **Database** - PostgreSQL database for storing user profiles and progress
- **Real-time** - Sync data across devices
- **Security** - Row-level security policies

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in the details:
   - **Name**: AMA Career Platform
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for the project to be provisioned

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Find these two values:
   - **Project URL** (looks like `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys** > **anon** > **public** (long string starting with `eyJ...`)

## Step 3: Update .env.local

1. Open `/Users/NithinAwasome/Downloads/AMA/.env.local`
2. Replace the Supabase placeholders with your real credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...
```

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  assigned_track TEXT,
  career_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Career Progress Table
CREATE TABLE IF NOT EXISTS career_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  track TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, track)
);

-- Row Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_progress ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Career Progress Policies
CREATE POLICY "Users can view their own progress"
  ON career_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON career_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON career_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_progress_updated_at
  BEFORE UPDATE ON career_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, assigned_track, career_data)
  VALUES (NEW.id, NULL, NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click **Run** to execute the SQL

## Step 5: Enable Google OAuth (Optional)

To enable "Sign in with Google":

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google** to ON
4. You'll need to create a Google OAuth application:

### Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: AMA Career Platform
   - User support email: Your email
   - Developer contact: Your email
6. Create OAuth Client ID:
   - Application type: Web application
   - Name: AMA Career Platform
   - Authorized JavaScript origins: `https://xxxxxxxxxxxxx.supabase.co`
   - Authorized redirect URIs: `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`
7. Copy **Client ID** and **Client Secret**
8. Paste them into Supabase Google Provider settings
9. Click **Save**

## Step 6: Restart Development Server

After updating .env.local:

```bash
# Stop the current dev server (Ctrl+C if running)
# Restart it
npm run dev
```

## Step 7: Test Authentication

1. Open http://localhost:3000
2. Click "Sign In" in the top right
3. Try creating an account with email/password
4. Or try "Sign in with Google" if you enabled OAuth

## Troubleshooting

### "Supabase is not configured" error
- Check that .env.local has your real Supabase URL and anon key
- Restart the dev server after updating .env.local
- Make sure there are no typos in the credentials

### "Invalid API key" error
- Make sure you copied the **anon** / **public** key, not the **service_role** key
- The anon key is safe to use in client-side code
- Never expose the service_role key

### Google OAuth not working
- Verify redirect URIs in Google Cloud Console match Supabase exactly
- Check that Google provider is enabled in Supabase
- Make sure Client ID and Secret are correct

### Database errors
- Verify the SQL schema was executed successfully
- Check the Tables section in Supabase to see if tables exist
- Review RLS policies are enabled

## Security Best Practices

1. **Never commit .env.local** - Already in .gitignore
2. **Use Row Level Security (RLS)** - Already configured in SQL above
3. **Keep service_role key secret** - Only use anon key in client code
4. **Rotate keys regularly** - Can regenerate in Supabase dashboard
5. **Enable 2FA on Supabase account** - Protect your project

## Next Steps

After Supabase is configured:
1. ✅ Authentication will work (email/password + Google)
2. ✅ User profiles will be created automatically on signup
3. ✅ Career progress will be saved to database
4. ✅ Data will persist across sessions and devices

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com/
- Google OAuth Setup: https://supabase.com/docs/guides/auth/social-login/auth-google

## Current Status

Check your browser console for:
- ✅ No warning = Supabase is configured correctly
- ⚠️ Warning = Supabase needs to be set up (follow this guide)

The app will work without Supabase, but authentication features will be disabled.
