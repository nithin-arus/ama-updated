import { NextRequest, NextResponse } from 'next/server';

// Type definitions for the API response
interface SessionResponse {
  sessionId: string;
  token: string;
  callId: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SessionResponse | ErrorResponse>> {
  try {
    console.log('Starting Ultravox call with AMA_Updated agent...');
    
    const API_KEY = '0IKNZlRW.Cgk3w7fAC95PmD9oB7KBffbK8EIRnpkk';
    
    // Start the call with AMA_Updated agent
    const response = await fetch('https://api.ultravox.ai/api/agents/AMA_Updated/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
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

    const data = await response.json();
    
    if (!data.callId) {
      throw new Error('Invalid response from Ultravox API - missing callId');
    }
    
    console.log('Ultravox call started:', data.callId);
    
    // Return the session data as JSON with 200 status
    return NextResponse.json({
      sessionId: data.callId,
      token: data.callId,
      callId: data.callId,
    });
  } catch (error) {
    // Log the full error stack trace for debugging
    console.error('Error starting Ultravox call:', error);
    
    // Extract error message safely
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Return structured error response
    return NextResponse.json(
      { 
        error: 'Failed to start voice session',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
