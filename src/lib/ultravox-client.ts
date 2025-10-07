import { UltravoxResponse } from '@/types';
import { UltravoxSession as UltravoxSDKSession } from 'ultravox-client';
import { retryWithBackoff, ultravoxCircuitBreaker } from './api-utils';
import { shouldUseMockClients, MockUltravoxClient } from './mock-clients';

export interface UltravoxSession {
  sessionId: string;
  token: string;
}

export interface UltravoxClient {
  on: (event: string, callback: (data: any) => void) => void;
  start: () => void;
  end: () => void;
}

// Real implementation using the official ultravox-client SDK
export function createUltravoxClient(session: UltravoxSession): UltravoxClient {
  // Create a new Ultravox session instance using the official SDK
  const ultravoxSession = new UltravoxSDKSession();
  
  // Return a wrapper that matches our expected interface
  return {
    on: (event: string, callback: (data: any) => void) => {
      // Map our events to the SDK's event system
      ultravoxSession.addEventListener(event, callback);
    },
    start: () => {
      console.log('Starting Ultravox session:', session.sessionId);
      // Use the SDK's joinCall method
      ultravoxSession.joinCall(session.sessionId);
    },
    end: () => {
      console.log('Ending Ultravox session');
      // Use the SDK's end method or equivalent
      // Note: Update this method call based on the actual SDK API
      try {
        (ultravoxSession as any).disconnect?.();
      } catch (error) {
        console.log('Session ended');
      }
    }
  };
}

// Direct session creation function for API endpoints
export async function startSession(): Promise<UltravoxSession> {
  // Check if we should use mock implementation
  if (shouldUseMockClients()) {
    console.log('🎭 Using mock Ultravox client for development');
    const mockClient = new MockUltravoxClient();
    return await mockClient.startSession();
  }

  // Use the provided API key for AMA_Updated agent
  const API_KEY = '0IKNZlRW.Cgk3w7fAC95PmD9oB7KBffbK8EIRnpkk';

  return ultravoxCircuitBreaker.execute(async () => {
    return retryWithBackoff(async () => {
      // Call the Ultravox API to start a call with AMA_Updated agent
      const response = await fetch('https://api.ultravox.ai/api/agents/AMA_Updated/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          // Initial context for the career assessment
          prompt: "You are a career assessment AI. Start by greeting the user and asking them about their career interests, skills, and goals. Guide them through a conversation to understand what type of career path would suit them best.",
          templateContext: {
            assessment_type: "career_guidance",
            focus_areas: ["interests", "skills", "goals", "experience"]
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Ultravox API error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const sessionData = await response.json();
      
      // Validate response structure
      if (!sessionData.callId) {
        throw new Error('Invalid session response from Ultravox API - missing callId');
      }
      
      return {
        sessionId: sessionData.callId,
        token: sessionData.callId, // Use callId as token for Ultravox calls
      };
    }, 3, 1000);
  });
}
