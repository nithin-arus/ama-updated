-- ========================================
-- AMA Career Platform Database Schema
-- ========================================
-- Run this SQL in your Supabase SQL Editor after creating the project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- User Profiles Table
-- ========================================
-- Stores user profile information and career track assignment
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  assigned_track TEXT,
  career_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- Career Progress Table
-- ========================================
-- Stores user progress for each career track
CREATE TABLE IF NOT EXISTS public.career_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  track TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, track)
);

-- ========================================
-- Row Level Security (RLS)
-- ========================================
-- Enable RLS on all tables for security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_progress ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS Policies for user_profiles
-- ========================================
-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own profile
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.user_profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.user_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- RLS Policies for career_progress
-- ========================================
-- Users can view their own progress
DROP POLICY IF EXISTS "Users can view their own progress" ON public.career_progress;
CREATE POLICY "Users can view their own progress"
  ON public.career_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.career_progress;
CREATE POLICY "Users can insert their own progress"
  ON public.career_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
DROP POLICY IF EXISTS "Users can update their own progress" ON public.career_progress;
CREATE POLICY "Users can update their own progress"
  ON public.career_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own progress
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.career_progress;
CREATE POLICY "Users can delete their own progress"
  ON public.career_progress FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- Automatic Timestamp Update Function
-- ========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- Triggers for Automatic Timestamp Updates
-- ========================================
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_career_progress_updated_at ON public.career_progress;
CREATE TRIGGER update_career_progress_updated_at
  BEFORE UPDATE ON public.career_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ========================================
-- Auto-create User Profile on Signup
-- ========================================
-- This function automatically creates a user profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, assigned_track, career_data)
  VALUES (NEW.id, NULL, NULL)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- Indexes for Performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_career_progress_user_id ON public.career_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_career_progress_track ON public.career_progress(track);

-- ========================================
-- Grant Permissions
-- ========================================
-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_progress TO authenticated;

-- ========================================
-- Verification Queries
-- ========================================
-- Run these to verify everything is set up correctly:

-- Check if tables exist
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check if policies exist
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- ========================================
-- DONE! 🎉
-- ========================================
-- Your database is now ready for the AMA Career Platform!
-- Next steps:
-- 1. Update .env.local with your Supabase credentials
-- 2. Restart your dev server
-- 3. Test authentication
