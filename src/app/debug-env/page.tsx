'use client';

import { SUPABASE_URL, SUPABASE_ANON_KEY, ULTRAVOX_API_KEY, isSupabaseConfigured } from '@/lib/env';

export default function DebugEnvPage() {
  const supabaseUrl = SUPABASE_URL;
  const supabaseKey = SUPABASE_ANON_KEY;
  const ultravoxKey = ULTRAVOX_API_KEY;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Environment Variables Debug</h1>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="font-semibold text-lg mb-2">Supabase URL</h2>
            <p className="font-mono text-sm break-all">
              {supabaseUrl || '❌ NOT SET'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Type: {typeof supabaseUrl}
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold text-lg mb-2">Supabase Anon Key</h2>
            <p className="font-mono text-sm break-all">
              {supabaseKey ? `${supabaseKey.substring(0, 30)}...` : '❌ NOT SET'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Type: {typeof supabaseKey} | Length: {supabaseKey?.length || 0}
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold text-lg mb-2">Ultravox API Key</h2>
            <p className="font-mono text-sm break-all">
              {ultravoxKey ? `${ultravoxKey.substring(0, 20)}...` : '❌ NOT SET'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Type: {typeof ultravoxKey} | Length: {ultravoxKey?.length || 0}
            </p>
          </div>

          <div className={`border rounded p-4 mt-6 ${isSupabaseConfigured ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h2 className="font-semibold text-lg mb-2">
              {isSupabaseConfigured ? '✅ Supabase Configured' : '❌ Supabase Not Configured'}
            </h2>
            <p className="text-sm">
              {isSupabaseConfigured
                ? 'All environment variables are set correctly. Authentication should work!'
                : 'Environment variables are missing or set to placeholder values. Please check your .env.local file.'}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
            <h2 className="font-semibold text-lg mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Check if all values show correctly above</li>
              <li>If they show ❌ NOT SET, the environment variables are not being loaded</li>
              <li>If they show actual values, Supabase should work</li>
              <li>Open browser console (F12) to see additional debug logs</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
