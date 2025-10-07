import { UltravoxResponse, CareerData, TrackType } from '@/types';
import { supabase } from '@/lib/supabase-client';

export async function generateCareerMap(raw: UltravoxResponse): Promise<CareerData> {
  try {
    // Step 1: Analyze conversation
    const r1 = await fetch('/api/analyze-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!r1.ok) {
      throw new Error('Failed to analyze conversation');
    }

    const { track } = await r1.json();

    // Step 2: Generate content for the track
    const r2 = await fetch(`/api/generate-content?track=${track}`);

    if (!r2.ok) {
      throw new Error('Failed to generate content');
    }

    const data: CareerData = await r2.json();

    // Step 3: Save to localStorage (browser only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('ama-call-completed', 'true');
      localStorage.setItem('ama-assigned-track', track);
      saveCareerData(track, data);
    }

    // Step 4: Save to Supabase if logged in
    await saveCareerDataToSupabase(track, data);

    return data;
  } catch (error) {
    console.error('Error generating career map:', error);
    throw error;
  }
}

export function saveCareerData(track: TrackType, data: CareerData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(data));
  }
}

export function loadCareerData(track: TrackType): CareerData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`ama-career-data-${track}`);
  return stored ? JSON.parse(stored) : null;
}

export function getAssignedTrack(): TrackType | null {
  if (typeof window === 'undefined') return null;
  const track = localStorage.getItem('ama-assigned-track');
  return track as TrackType | null;
}

export function isCallCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ama-call-completed') === 'true';
}

export async function saveCareerDataToSupabase(track: TrackType, data: CareerData): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user logged in, skipping Supabase save');
      return;
    }

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        assigned_track: track,
        career_data: data,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving to Supabase:', error);
    }
  } catch (error) {
    console.error('Error saving career data to Supabase:', error);
  }
}

export async function loadCareerDataFromSupabase(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error loading from Supabase:', error);
      return;
    }

    if (data && typeof window !== 'undefined') {
      // Sync Supabase data to localStorage (browser only)
      if (data.assigned_track) {
        localStorage.setItem('ama-assigned-track', data.assigned_track);
        localStorage.setItem('ama-call-completed', 'true');
      }

      if (data.career_data) {
        localStorage.setItem(`ama-career-data-${data.assigned_track}`, JSON.stringify(data.career_data));
      }
    }
  } catch (error) {
    console.error('Error loading career data from Supabase:', error);
  }
}

export function clearAllData(): void {
  // Clear localStorage (browser only)
  if (typeof window !== 'undefined') {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('ama-'));
    keys.forEach(key => localStorage.removeItem(key));
  }
}
