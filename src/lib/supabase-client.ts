import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Supabase URL is not defined. Please set NEXT_PUBLIC_SUPABASE_URL in your .env.local file for development, and in Vercel for production.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Supabase anon key is not defined. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file for development, and in Vercel for production.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
