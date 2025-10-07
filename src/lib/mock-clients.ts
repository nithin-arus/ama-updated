/**
 * Mock implementations for external services when API keys are missing or set to 'demo'
 */

// Mock Ultravox client for development/testing
export class MockUltravoxClient {
  private sessionId: string;
  private token: string;
  private isConnected: boolean = false;

  constructor() {
    this.sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.token = `mock_token_${Math.random().toString(36).substr(2, 20)}`;
  }

  async startSession() {
    console.log('🎭 Mock Ultravox: Starting session');
    return {
      sessionId: this.sessionId,
      token: this.token,
    };
  }

  async joinCall() {
    console.log('🎭 Mock Ultravox: Joining call');
    this.isConnected = true;
    return { success: true };
  }

  async endCall() {
    console.log('🎭 Mock Ultravox: Ending call');
    this.isConnected = false;
    return { success: true };
  }

  addEventListener(event: string, callback: Function) {
    console.log(`🎭 Mock Ultravox: Adding listener for ${event}`);
    // Simulate events after a delay
    setTimeout(() => {
      if (event === 'transcript') {
        callback({
          transcript: "I'm interested in game design and creating interactive experiences. I love working with teams and have some experience with programming.",
          confidence: 0.95,
          timestamp: Date.now()
        });
      } else if (event === 'analysis') {
        callback({
          analysis: "User shows strong interest in interactive systems and team collaboration",
          confidence: 0.88,
          timestamp: Date.now()
        });
      }
    }, 2000);
  }
}

// Mock Perplexity client for development/testing
export class MockPerplexityClient {
  async analyzeConversation(transcript: string, metadata: any) {
    console.log('🎭 Mock Perplexity: Analyzing conversation');
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock analysis based on transcript content
    const lowerTranscript = transcript.toLowerCase();
    
    let track: 'Game Design' | 'Content Creation' | 'Game Asset Artist' = 'Game Design';
    let reason = 'User showed interest in interactive systems';

    if (lowerTranscript.includes('art') || lowerTranscript.includes('visual') || lowerTranscript.includes('drawing') || lowerTranscript.includes('3d') || lowerTranscript.includes('2d') || lowerTranscript.includes('modeling')) {
      track = 'Game Asset Artist';
      reason = 'User expressed interest in art, visuals, and design for games';
    } else if (lowerTranscript.includes('content') || lowerTranscript.includes('writing') || lowerTranscript.includes('video') || lowerTranscript.includes('streaming') || lowerTranscript.includes('sharing')) {
      track = 'Content Creation';
      reason = 'User showed interest in content creation and media production';
    } else if (lowerTranscript.includes('game') || lowerTranscript.includes('mechanics') || lowerTranscript.includes('interactive') || lowerTranscript.includes('gameplay')) {
      track = 'Game Design';
      reason = 'User expressed interest in game mechanics and interactive systems';
    }

    return {
      track,
      reason
    };
  }
}

// Mock Supabase client for development/testing
export class MockSupabaseClient {
  private mockUser: any = null;
  private mockCareerProgress: any[] = [];

  async auth() {
    return {
      getUser: async () => {
        return {
          data: { user: this.mockUser },
          error: this.mockUser ? null : new Error('No user')
        };
      },
      signInWithPassword: async ({ email, password }: any) => {
        console.log('🎭 Mock Supabase: Signing in with password');
        this.mockUser = {
          id: 'mock-user-id',
          email,
          created_at: new Date().toISOString()
        };
        return { data: { user: this.mockUser }, error: null };
      },
      signUp: async ({ email, password }: any) => {
        console.log('🎭 Mock Supabase: Signing up');
        this.mockUser = {
          id: 'mock-user-id',
          email,
          created_at: new Date().toISOString()
        };
        return { data: { user: this.mockUser }, error: null };
      },
      signInWithOAuth: async ({ provider }: any) => {
        console.log(`🎭 Mock Supabase: Signing in with ${provider}`);
        this.mockUser = {
          id: 'mock-user-id',
          email: `user@${provider}.com`,
          created_at: new Date().toISOString()
        };
        return { data: { user: this.mockUser }, error: null };
      },
      signOut: async () => {
        console.log('🎭 Mock Supabase: Signing out');
        this.mockUser = null;
        return { error: null };
      },
      onAuthStateChange: (callback: Function) => {
        console.log('🎭 Mock Supabase: Setting up auth state change listener');
        // Simulate auth state change
        setTimeout(() => {
          callback('SIGNED_IN', { user: this.mockUser });
        }, 100);
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    };
  }

  from(table: string) {
    return {
      select: (columns: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            console.log(`🎭 Mock Supabase: Selecting from ${table}`);
            if (table === 'user_profiles') {
              return {
                data: this.mockUser ? {
                  id: 'mock-profile-id',
                  user_id: this.mockUser.id,
                  assigned_track: 'gameDesign',
                  career_data: null,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                } : null,
                error: null
              };
            }
            return { data: null, error: null };
          }
        })
      }),
      upsert: async (data: any) => {
        console.log(`🎭 Mock Supabase: Upserting to ${table}`, data);
        this.mockCareerProgress.push(data);
        return { data, error: null };
      },
      insert: async (data: any) => {
        console.log(`🎭 Mock Supabase: Inserting into ${table}`, data);
        this.mockCareerProgress.push(data);
        return { data, error: null };
      }
    };
  }
}

// Utility function to check if we should use mock clients
export function shouldUseMockClients(): boolean {
  const ultravoxKey = process.env.ULTRAVOX_API_KEY;
  const pplxKey = process.env.PPLX_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  return (
    !ultravoxKey || ultravoxKey === 'demo_key' ||
    !pplxKey || pplxKey === 'demo_key' ||
    !supabaseUrl || supabaseUrl === 'http://localhost:54321'
  );
}

// Mock data generators
export const mockCareerData = {
  gameDesign: {
    targetRole: 'Game Designer',
    selectedTrack: 'gameDesign',
    totalXP: 1000,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      {
        id: 1,
        title: 'Game Design Fundamentals',
        xpRequired: 100,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_1_1',
            title: 'Introduction to Game Design',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Learn the basics of game design',
            resources: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
          },
          {
            id: 'gd_1_2',
            title: 'Game Design Principles',
            xp: 25,
            isCompleted: false,
            type: 'article',
            description: 'Understanding core game design principles',
            resources: ['https://example.com/article1'],
          },
        ],
      },
    ],
  },
  artDesign: {
    targetRole: 'Art Director',
    selectedTrack: 'artDesign',
    totalXP: 1000,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      {
        id: 1,
        title: 'Art Design Fundamentals',
        xpRequired: 100,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'ad_1_1',
            title: 'Introduction to Art Design',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Learn the basics of art design',
            resources: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
          },
        ],
      },
    ],
  },
};
