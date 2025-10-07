import { NextRequest, NextResponse } from 'next/server';

// Type definitions for the API request/response
interface AnalyzeRequest {
  raw: {
    sessionId: string;
    transcript: string;
    duration: number;
    metadata: Record<string, any>;
  };
}

interface AnalysisResponse {
  track: 'Game Design' | 'Content Creation' | 'Game Asset Artist';
  reason: string;
}

interface FallbackResponse {
  track: 'Content Creation';
  reason: 'Fallback – error';
}

// System prompt for Perplexity AI
const SYSTEM_PROMPT = `You are an AI career counselor. You will receive the full transcript of a user's spoken conversation via voice assistant. Based on their words and stated interests, return the single most appropriate career track from this list:
"Game Design" (if the user expresses interest in game mechanics, interactive systems, gameplay ideas)
"Content Creation" (if the user talks about making videos, streaming, writing, or sharing content)
"Game Asset Artist" (if the user mentions art, visuals, design, 3D, 2D, drawing, modeling for games)
Your response must be a strict JSON object:
{ "track": "<best_matching_track>", "reason": "<one-sentence rationale>" }
where <best_matching_track> is one of "Game Design", "Content Creation", "Game Asset Artist", and reason briefly explains your decision.`;

export async function POST(request: NextRequest): Promise<NextResponse<AnalysisResponse | FallbackResponse>> {
  try {
    // Parse and validate request body
    const body: AnalyzeRequest = await request.json();
    
    if (!body.raw || !body.raw.transcript) {
      console.error('Invalid request body: missing raw.transcript');
      return NextResponse.json(
        { track: 'Content Creation', reason: 'Fallback – error' },
        { status: 400 }
      );
    }

    // Use the provided API key
    const API_KEY = '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';

    // Prepare the user prompt with full JSON transcript
    const userPrompt = `Analyze this career conversation transcript:

${JSON.stringify(body.raw, null, 2)}`;

    // Call Perplexity API
    const perplexityResponse = await fetch('https://api.perplexity.ai/v0/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'pplx-70b-online',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    if (!perplexityResponse.ok) {
      console.error('Perplexity API error:', perplexityResponse.status, perplexityResponse.statusText);
      return NextResponse.json(
        { track: 'Content Creation', reason: 'Fallback – API error' },
        { status: 200 }
      );
    }

    const perplexityData = await perplexityResponse.json();
    const content = perplexityData.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content received from Perplexity API');
      return NextResponse.json(
        { track: 'Content Creation', reason: 'Fallback – no content' },
        { status: 200 }
      );
    }

    // Parse the JSON response from Perplexity
    try {
      const analysisResult = JSON.parse(content);
      
      // Validate and normalize track name
      const validTracks = ['Game Design', 'Content Creation', 'Game Asset Artist'];
      const normalizedTrack = validTracks.find(track => 
        track.toLowerCase() === analysisResult.track?.toLowerCase()
      ) || 'Content Creation';
      
      const response: AnalysisResponse = {
        track: normalizedTrack as 'Game Design' | 'Content Creation' | 'Game Asset Artist',
        reason: analysisResult.reason || 'No reason provided',
      };

      console.log('Perplexity analysis result:', response);
      return NextResponse.json(response, { status: 200 });
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      return NextResponse.json(
        { track: 'Content Creation', reason: 'Fallback – parsing error' },
        { status: 200 }
      );
    }

  } catch (error) {
    // Log the error for diagnostics
    console.error('Error in analyze-conversation endpoint:', error);
    
    // Return fallback response
    return NextResponse.json(
      { track: 'Content Creation', reason: 'Fallback – error' },
      { status: 200 }
    );
  }
}