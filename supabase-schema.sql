-- Enable Row Level Security
ALTER TABLE IF EXISTS public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    assigned_track TEXT CHECK (assigned_track IN ('gameDesign', 'artDesign', 'contentCreation')),
    career_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id)
);

-- Create RLS policies
CREATE POLICY "Users can view their own profile" 
    ON public.user_profiles FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
    ON public.user_profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
    ON public.user_profiles FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER on_user_profiles_updated
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create the career_progress table
CREATE TABLE IF NOT EXISTS public.career_progress (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    track TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, track)
);

-- Enable Row Level Security for career_progress
ALTER TABLE public.career_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Only the authenticated user can read/write their own career_progress rows
CREATE POLICY "User can access own career progress"
    ON public.career_progress
    FOR ALL
    USING (auth.uid() = user_id);

-- Create trigger for updated_at on career_progress
CREATE TRIGGER on_career_progress_updated
    BEFORE UPDATE ON public.career_progress
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
