'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/hooks/useAuth';
import { debounce } from 'ts-debounce';

import { CareerProgressData } from '@/lib/validation';

interface TrackLockState {
  isLocked: boolean;
  assignedTrack: string | null;
  mounted: boolean;
  syncCareerProgress?: (track: string, data: any) => Promise<void>;
}

// Helper function to synchronously get the initial state from localStorage on the client
const getInitialUnlockState = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Default for server-side rendering
  }
  const callCompleted = localStorage.getItem('ama-call-completed') === 'true';
  const assignedTrack = !!localStorage.getItem('ama-assigned-track');
  return callCompleted || assignedTrack;
};

export function useDashboardUnlock(): { unlocked: boolean; mounted: boolean } {
  const [mounted, setMounted] = useState(false);
  // Initialize state directly from localStorage on the client to prevent flickering
  const [unlocked, setUnlocked] = useState<boolean>(getInitialUnlockState);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // This listener keeps the state in sync across tabs
    const handleStorageChange = () => {
      setUnlocked(getInitialUnlockState());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [mounted]);

  return { unlocked, mounted };
}

// Helper for useTrackLock
const getInitialTrackLockState = (): { isLocked: boolean; assignedTrack: string | null } => {
    if (typeof window === 'undefined') {
        return { isLocked: false, assignedTrack: null };
    }
    const track = localStorage.getItem('ama-assigned-track');
    return { isLocked: !!track, assignedTrack: track };
}

export function useTrackLock(): TrackLockState {
  const [mounted, setMounted] = useState(false);
  const [trackState, setTrackState] = useState(getInitialTrackLockState);
  const { user, isAuthenticated } = useAuth();
  const debouncedSyncRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Initialize debounced sync function
  useEffect(() => {
    if (!debouncedSyncRef.current) {
      debouncedSyncRef.current = debounce(async (userId: string, track: string, data: any) => {
        try {
          await supabase
            .from('career_progress')
            .upsert({
              user_id: userId,
              track,
              data,
            });
          console.log('Career progress synced to Supabase:', { userId, track });
        } catch (error) {
          console.error('Error syncing career progress to Supabase:', error);
        }
      }, 1000); // 1 second debounce
    }
  }, []);

  // Sync career progress to Supabase when user is authenticated and data changes
  const syncCareerProgress = useCallback(async (track: string, data: any) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot sync career progress: user not authenticated');
      return;
    }

    // Update localStorage immediately for responsive UI
    try {
      localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    // Debounced sync to Supabase
    if (debouncedSyncRef.current) {
      debouncedSyncRef.current(user.id, track, data);
    }
  }, [isAuthenticated, user?.id]);

  // Fetch and hydrate career progress from Supabase on login
  const hydrateFromSupabase = useCallback(async (userId: string) => {
    try {
      const { data: careerProgress, error } = await supabase
        .from('career_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching career progress from Supabase:', error);
        return;
      }

      if (careerProgress && careerProgress.length > 0) {
        // Hydrate localStorage with all career progress data
        careerProgress.forEach((progress: CareerProgressData) => {
          try {
            localStorage.setItem(`ama-career-data-${progress.track}`, JSON.stringify(progress.data));
          } catch (error) {
            console.error(`Error hydrating localStorage for track ${progress.track}:`, error);
          }
        });

        // Set the assigned track from the first progress entry or localStorage
        const assignedTrack = careerProgress[0]?.track || localStorage.getItem('ama-assigned-track');
        if (assignedTrack) {
          localStorage.setItem('ama-assigned-track', assignedTrack);
          setTrackState({ isLocked: true, assignedTrack });
        }

        console.log('Career progress hydrated from Supabase:', careerProgress.length, 'tracks');
      }
    } catch (error) {
      console.error('Error in hydrateFromSupabase:', error);
    }
  }, []);

  // Monitor auth state changes for hydration
  useEffect(() => {
    if (!mounted) return;

    if (isAuthenticated && user?.id) {
      // User logged in - hydrate from Supabase
      hydrateFromSupabase(user.id);
    } else if (!isAuthenticated) {
      // User logged out - clear track state but keep localStorage for offline access
      setTrackState({ isLocked: false, assignedTrack: null });
    }
  }, [mounted, isAuthenticated, user?.id, hydrateFromSupabase]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = () => {
      setTrackState(getInitialTrackLockState());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [mounted]);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      if (debouncedSyncRef.current) {
        debouncedSyncRef.current.cancel();
      }
    };
  }, []);

  return { 
    ...trackState, 
    mounted,
    syncCareerProgress: isAuthenticated ? syncCareerProgress : undefined
  };
}
