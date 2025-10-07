'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { User } from '@/types';
import { loadCareerDataFromSupabase, clearAllData } from '@/utils/api';

import { UserProfile } from '@/lib/validation';

// LocalStorage key for user UID persistence
const USER_STORAGE_KEY = 'ama-user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    
    // Safely get initial user from localStorage
    try {
      const storedUserId = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUserId) {
        console.log('Found stored user ID:', storedUserId);
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
  }, []);

  // Main auth state management effect
  useEffect(() => {
    if (!mounted) return;

    // Get initial session and set up auth state listener
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Sync localStorage with current session
        if (session?.user) {
          localStorage.setItem(USER_STORAGE_KEY, session.user.id);
          await fetchUserProfile(session.user.id);
        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    // Fetch user profile from Supabase user_profiles table
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          console.warn('No user profile found:', error.message);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setProfile(null);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Update localStorage with new user ID
        localStorage.setItem(USER_STORAGE_KEY, session.user.id);
        
        // Fetch user profile and load career data
        await fetchUserProfile(session.user.id);
        await loadCareerDataFromSupabase();
      } else if (event === 'SIGNED_OUT') {
        // Clear localStorage and reset state
        localStorage.removeItem(USER_STORAGE_KEY);
        setProfile(null);
        clearAllData();
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        // Ensure localStorage stays in sync on token refresh
        localStorage.setItem(USER_STORAGE_KEY, session.user.id);
      }
    });

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [mounted]);

  // Authentication utility functions
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  // Computed values
  const isAuthenticated = !!user;
  const userId = user?.id;

  return {
    // State
    user,
    profile,
    isAuthenticated,
    loading,
    mounted,
    userId,
    
    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
