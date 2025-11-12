import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// List of placeholder values that indicate Supabase is not configured
const PLACEHOLDER_VALUES = [
  'your_supabase_url_here',
  'your_supabase_anon_key_here',
  'demo_key',
  'http://localhost:54321',
];

// Check if Supabase is properly configured
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  !PLACEHOLDER_VALUES.includes(supabaseUrl) &&
  !PLACEHOLDER_VALUES.includes(supabaseAnonKey);

// Create Supabase client with fallback for unconfigured state
export const supabase = isSupabaseConfigured && supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      'https://placeholder.supabase.co', // Fallback URL (won't be used for real requests)
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder', // Placeholder key
      {
        auth: {
          persistSession: false, // Don't persist sessions when not configured
        },
      }
    );

// Export configuration status for components to check
export const isSupabaseReady = isSupabaseConfigured;

// Log warning if Supabase is not configured
if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    '⚠️ Supabase is not configured. Authentication features will not work.\n' +
    'To enable Supabase:\n' +
    '1. Create a project at https://supabase.com/dashboard\n' +
    '2. Update .env.local with your Supabase URL and anon key\n' +
    '3. Restart the development server\n'
  );
}

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          assigned_track: string | null;
          career_data: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          assigned_track?: string | null;
          career_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          assigned_track?: string | null;
          career_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      career_progress: {
        Row: {
          user_id: string;
          track: string;
          data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          track: string;
          data: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          track?: string;
          data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
