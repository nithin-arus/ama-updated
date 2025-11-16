/**
 * Environment variables configuration
 *
 * Next.js automatically loads environment variables from .env.local
 * Variables prefixed with NEXT_PUBLIC_ are exposed to the browser
 */

// Supabase configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Ultravox configuration
export const ULTRAVOX_API_KEY = process.env.NEXT_PUBLIC_ULTRAVOX_API_KEY || '';

// Debug logging (client-side only)
if (typeof window !== 'undefined') {
  console.log('🔍 Environment Variables Debug:');
  console.log('  SUPABASE_URL:', SUPABASE_URL || '❌ NOT SET');
  console.log('  SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? `✅ SET (${SUPABASE_ANON_KEY.substring(0, 20)}...)` : '❌ NOT SET');
  console.log('  ULTRAVOX_API_KEY:', ULTRAVOX_API_KEY ? `✅ SET (${ULTRAVOX_API_KEY.substring(0, 15)}...)` : '❌ NOT SET');

  // Also log what process.env contains
  console.log('  Raw process.env.NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
}

// Placeholder detection
const PLACEHOLDER_VALUES = [
  'your_supabase_url_here',
  'your_supabase_anon_key_here',
  'demo_key',
  'http://localhost:54321',
];

// Check if Supabase is properly configured
export const isSupabaseConfigured =
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !PLACEHOLDER_VALUES.includes(SUPABASE_URL) &&
  !PLACEHOLDER_VALUES.includes(SUPABASE_ANON_KEY);

if (typeof window !== 'undefined') {
  console.log('  Supabase Configured:', isSupabaseConfigured ? '✅ YES' : '❌ NO');
}
