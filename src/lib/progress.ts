import { supabase } from './supabase-client';
import type { CareerData } from '@/types';

/**
 * Save progress to Supabase
 */
export async function saveProgressToSupabase(
  userId: string,
  track: string,
  careerData: CareerData
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Progress] Saving to Supabase:', { userId, track });

    const { error } = await supabase
      .from('career_progress')
      .upsert(
        {
          user_id: userId,
          track,
          data: careerData,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,track',
        }
      );

    if (error) {
      console.error('[Progress] Supabase save error:', error);
      return { success: false, error: error.message };
    }

    console.log('[Progress] Successfully saved to Supabase');
    return { success: true };
  } catch (error: any) {
    console.error('[Progress] Error saving to Supabase:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Load progress from Supabase
 */
export async function loadProgressFromSupabase(
  userId: string,
  track: string
): Promise<{ data: CareerData | null; error?: string }> {
  try {
    console.log('[Progress] Loading from Supabase:', { userId, track });

    const { data, error } = await supabase
      .from('career_progress')
      .select('data')
      .eq('user_id', userId)
      .eq('track', track)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found - user hasn't saved progress yet
        console.log('[Progress] No saved progress found in Supabase');
        return { data: null };
      }
      console.error('[Progress] Supabase load error:', error);
      return { data: null, error: error.message };
    }

    console.log('[Progress] Successfully loaded from Supabase');
    return { data: data.data as CareerData };
  } catch (error: any) {
    console.error('[Progress] Error loading from Supabase:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Save progress to localStorage (fallback/cache)
 */
export function saveProgressToLocalStorage(track: string, careerData: CareerData) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(careerData));
    console.log('[Progress] Saved to localStorage');
  } catch (error) {
    console.error('[Progress] Error saving to localStorage:', error);
  }
}

/**
 * Load progress from localStorage
 */
export function loadProgressFromLocalStorage(track: string): CareerData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(`ama-career-data-${track}`);
    if (!data) return null;

    return JSON.parse(data) as CareerData;
  } catch (error) {
    console.error('[Progress] Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Sync progress: Save to both Supabase and localStorage
 */
export async function syncProgress(
  userId: string | null,
  track: string,
  careerData: CareerData
): Promise<{ success: boolean; error?: string }> {
  // Always save to localStorage for immediate access
  saveProgressToLocalStorage(track, careerData);

  // If user is authenticated, also save to Supabase
  if (userId) {
    return await saveProgressToSupabase(userId, track, careerData);
  }

  return { success: true };
}

/**
 * Load progress with fallback: Try Supabase first, then localStorage
 */
export async function loadProgress(
  userId: string | null,
  track: string
): Promise<CareerData | null> {
  // If user is authenticated, try loading from Supabase first
  if (userId) {
    const { data } = await loadProgressFromSupabase(userId, track);
    if (data) {
      // Also cache in localStorage
      saveProgressToLocalStorage(track, data);
      return data;
    }
  }

  // Fallback to localStorage
  return loadProgressFromLocalStorage(track);
}
