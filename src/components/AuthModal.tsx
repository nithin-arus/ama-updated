'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { isSupabaseConfigured as isSupabaseReady } from '@/lib/env';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

type AuthMode = 'signin' | 'signup' | 'reset';

// OAuth provider configuration
const OAUTH_PROVIDERS = [
  {
    provider: 'google' as const,
    label: 'Sign in with Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
  },
];

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();

  // Check if user has completed AMA assessment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completedAssessment = localStorage.getItem('assessmentCompleted');
      const careerData = localStorage.getItem('careerData');
      setHasCompletedAssessment(!!(completedAssessment || careerData));
    }
  }, [isOpen]);

  // Reset to initial mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      resetForm();
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if Supabase is configured
    if (!isSupabaseReady) {
      const errorMessage =
        'Supabase is not configured. Please set up your Supabase project credentials in .env.local to enable authentication.';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    // Block sign-up if assessment not completed
    if (mode === 'signup' && !hasCompletedAssessment) {
      setError('You must complete a session with AMA before signing up for career development.');
      toast.error('You must complete a session with AMA before signing up for career development.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast.success('Successfully signed in!');
        onClose();
      } else if (mode === 'signup') {
        await signUp(email, password);
        toast.success('Account created! Please check your email for verification.');
        onClose();
      } else if (mode === 'reset') {
        await resetPassword(email);
        toast.success('Password reset email sent!');
        setMode('signin');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google') => {
    // Check if Supabase is configured
    if (!isSupabaseReady) {
      const errorMessage =
        'Supabase is not configured. Please set up your Supabase project credentials in .env.local';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setOauthLoading(provider);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        const errorMessage = error.message || 'OAuth sign-in failed';
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success(`Redirecting to ${provider}...`);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'OAuth sign-in failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setOauthLoading(null);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setLoading(false);
    setOauthLoading(null);
    setError(null);
  };

  const switchMode = (newMode: AuthMode) => {
    // Block sign-up if assessment not completed
    if (newMode === 'signup' && !hasCompletedAssessment) {
      toast.error('You must complete a session with AMA before signing up for career development.');
      return;
    }
    setMode(newMode);
    resetForm();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close authentication modal"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'reset' && 'Reset Password'}
          </h2>
          <p id="auth-modal-description" className="text-gray-600">
            {mode === 'signin' && 'Sign in to your account to continue'}
            {mode === 'signup' && 'Create an account to save your progress'}
            {mode === 'reset' && 'Enter your email to reset your password'}
          </p>

          {/* Supabase not configured warning */}
          {!isSupabaseReady && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 text-sm font-medium">Supabase Not Configured</p>
                <p className="text-red-700 text-sm mt-1">
                  Please set up your Supabase project credentials in .env.local to enable authentication.
                </p>
              </div>
            </div>
          )}

          {/* Assessment completion warning for sign-up */}
          {isSupabaseReady && mode === 'signup' && !hasCompletedAssessment && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-800 text-sm font-medium">Assessment Required</p>
                <p className="text-orange-700 text-sm mt-1">
                  You must complete a session with AMA before signing up for career development.
                </p>
              </div>
            </div>
          )}
        </div>

        {mode !== 'reset' && (
          <div className="space-y-3 mb-6">
            {OAUTH_PROVIDERS.map(({ provider, label, icon }) => (
              <button
                key={provider}
                type="button"
                onClick={() => handleOAuthSignIn(provider)}
                disabled={!!oauthLoading || loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={`${label}${oauthLoading === provider ? ' (loading)' : ''}`}
              >
                {oauthLoading === provider ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  icon
                )}
                <span className="text-gray-700 font-medium">{label}</span>
              </button>
            ))}
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !!oauthLoading || (mode === 'signup' && !hasCompletedAssessment)}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            title={mode === 'signup' && !hasCompletedAssessment ? 'Complete AMA assessment first' : ''}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <User className="mr-2" size={18} />
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Send Reset Email'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {mode === 'signin' && (
            <>
              <p className="text-gray-600 mb-2">
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className={`font-medium ${
                    hasCompletedAssessment
                      ? 'text-primary-600 hover:text-primary-700 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!hasCompletedAssessment}
                  title={!hasCompletedAssessment ? 'Complete AMA assessment first' : ''}
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => switchMode('reset')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot your password?
              </button>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => switchMode('signin')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'reset' && (
            <p className="text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => switchMode('signin')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
