# Supabase Setup Guide for AMA Career Platform

## Overview

Your AMA Career Platform uses Supabase for:
- **User Authentication** (Email/Password + Google OAuth)
- **Career Progress Storage** (Track assignments, XP, completed tasks)
- **User Profiles** (Career track assignments, session transcripts)

## Current Supabase Configuration

Your Supabase project is already configured with:
- **URL**: `https://vuaeriezdmrzalnxbyss.supabase.co`
- **Anonymous Key**: Configured in `.env.local`

## Required Database Tables

You need to ensure these two tables exist in your Supabase database:

### 1. `user_profiles` Table

Stores user authentication data and assigned career tracks.

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  assigned_track TEXT CHECK (assigned_track IN ('gameDesign', 'artDesign', 'contentCreation')),
  career_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON user_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON user_profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

### 2. `career_progress` Table

Stores detailed progress for each user's career track (XP, completed tasks, levels).

```sql
CREATE TABLE career_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  track TEXT NOT NULL CHECK (track IN ('Game Design', 'Game Asset Artist', 'Content Creation')),
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, track)
);

-- Enable Row Level Security
ALTER TABLE career_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own progress
CREATE POLICY "Users can read own progress"
ON career_progress
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress"
ON career_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress"
ON career_progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_career_progress_user_id ON career_progress(user_id);
CREATE INDEX idx_career_progress_track ON career_progress(track);
```

## How to Set Up in Supabase Dashboard

### Step 1: Go to SQL Editor

1. Log in to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `vuaeriezdmrzalnxbyss`
3. Navigate to **SQL Editor** in the left sidebar

### Step 2: Create Tables

1. Click **+ New Query**
2. Copy and paste the `user_profiles` table SQL above
3. Click **Run** or press `Cmd/Ctrl + Enter`
4. Repeat for the `career_progress` table

### Step 3: Verify Tables Created

1. Go to **Table Editor** in the left sidebar
2. You should see both tables:
   - `user_profiles`
   - `career_progress`

### Step 4: Enable Authentication Providers

1. Go to **Authentication** → **Providers**
2. **Email** should already be enabled
3. For **Google OAuth** (when ready to enable):
   - Click on **Google** provider
   - Toggle **Enable Sign in with Google**
   - Add your Google OAuth credentials:
     - **Client ID**: From Google Cloud Console
     - **Client Secret**: From Google Cloud Console
   - Add authorized redirect URLs:
     - Development: `http://localhost:3000/api/auth/callback`
     - Production: `https://your-vercel-app.vercel.app/api/auth/callback`

## Environment Variables for Vercel

When deploying to Vercel, make sure these environment variables are set:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://vuaeriezdmrzalnxbyss.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Ultravox (you'll update with new key)
NEXT_PUBLIC_ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY
ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY

# Perplexity
PPLX_API_KEY=YOUR_PERPLEXITY_API_KEY
```

## Data Structure Examples

### `user_profiles.career_data` JSON Structure:
```json
{
  "assigned_track": "Game Design",
  "session_transcript": "I love designing games...",
  "analysis_reason": "User showed interest in game mechanics",
  "call_id": "abc123",
  "duration": 180,
  "analyzed_at": "2025-12-02T12:00:00.000Z"
}
```

### `career_progress.data` JSON Structure:
```json
{
  "trackName": "Game Design",
  "currentXP": 450,
  "currentLevel": 2,
  "levels": [
    {
      "id": "1",
      "levelNumber": 1,
      "title": "Foundation Level",
      "description": "...",
      "totalXP": 300,
      "isUnlocked": true,
      "isCompleted": true,
      "tasks": [
        {
          "id": "task-1",
          "title": "Introduction to Game Design",
          "description": "...",
          "type": "lesson",
          "xp": 50,
          "isCompleted": true,
          "resources": [...]
        }
      ]
    }
  ]
}
```

## Testing the Setup

### 1. Test User Sign Up

1. Start your app: `npm run dev`
2. Complete the voice assessment (or use bypass mode)
3. Click the sign in modal
4. Create a new account with email/password
5. Check Supabase Dashboard → **Authentication** → **Users**
   - You should see the new user listed

### 2. Test Progress Saving

1. Sign in to your account
2. Go to the dashboard
3. Complete a task
4. Check Supabase Dashboard → **Table Editor** → `career_progress`
   - You should see a row with your `user_id` and progress data

### 3. Test Progress Loading

1. Sign out (or clear localStorage)
2. Sign back in
3. Your progress should load from Supabase
4. Completed tasks should still be marked as complete

## Troubleshooting

### Issue: "Failed to save to Supabase"

**Check:**
1. RLS policies are correctly set up (see SQL above)
2. User is authenticated (`auth.uid()` is not null)
3. Table structure matches the schema

**Fix:**
- Run the RLS policy SQL commands again
- Check browser console for detailed error messages

### Issue: "No rows found" when loading progress

**This is normal** when:
- User hasn't completed any tasks yet
- User is using the app for the first time

**App behavior:**
- Falls back to loading fresh career data
- Progress will be saved on first task completion

### Issue: Authentication not working

**Check:**
1. `.env.local` has correct Supabase credentials
2. Supabase URL and keys are correct
3. Email authentication is enabled in Supabase Dashboard

## Security Notes

### Row Level Security (RLS)

- **All tables have RLS enabled**
- Users can only read/write their own data
- Policies check `auth.uid() = user_id`

### API Keys

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose (it's client-side)
- RLS policies protect the data even with the public key
- Service role key should NEVER be used in client code

## Vercel Deployment Checklist

Before deploying to Vercel:

- [ ] Both Supabase tables created
- [ ] RLS policies applied
- [ ] Environment variables added to Vercel
- [ ] Supabase URL configuration updated (if needed)
- [ ] Test authentication locally first
- [ ] Test progress saving/loading locally first

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Check Supabase Dashboard → **Logs** for database errors
3. Verify RLS policies are correctly applied
4. Ensure authentication is working (user is signed in)

---

**Status**: ✅ Ready for Supabase Setup

Your app code is fully integrated with Supabase. You just need to create the database tables!
