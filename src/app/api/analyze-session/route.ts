import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Type definitions
interface AnalyzeSessionRequest {
  transcript: string;
  userId: string;
  callId?: string;
  duration?: number;
}

interface AnalyzeSessionResponse {
  track: 'Game Design' | 'Content Creation' | 'Game Asset Artist';
  reason: string;
  saved: boolean;
}

interface PerplexityAnalysisResult {
  track: string;
  reason: string;
}

// Track mapping: Perplexity format → Database format
const TRACK_MAPPING: Record<string, string> = {
  'Game Design': 'gameDesign',
  'Content Creation': 'contentCreation',
  'Game Asset Artist': 'artDesign',
};

// Reverse mapping: Database format → Display format
const REVERSE_TRACK_MAPPING: Record<string, 'Game Design' | 'Content Creation' | 'Game Asset Artist'> = {
  'gameDesign': 'Game Design',
  'contentCreation': 'Content Creation',
  'artDesign': 'Game Asset Artist',
};

// System prompt for Perplexity AI
const SYSTEM_PROMPT = `You are an AI career counselor specializing in the gaming industry. You will receive the full transcript of a user's spoken conversation via voice assistant. Based on their words and stated interests, return the single most appropriate career track from this list:

- "Game Design" (if the user expresses interest in game mechanics, interactive systems, gameplay ideas, level design, game rules, player experience)
- "Content Creation" (if the user talks about making videos, streaming, writing, social media, sharing content, influencing, video editing, content strategy)
- "Game Asset Artist" (if the user mentions art, visuals, design, 3D modeling, 2D art, drawing, character design, environment art, textures, animation for games)

Your response must be a strict JSON object:
{ "track": "<best_matching_track>", "reason": "<one-sentence rationale>" }

where <best_matching_track> is exactly one of "Game Design", "Content Creation", or "Game Asset Artist", and reason briefly explains your decision based on what the user said.`;

/**
 * POST /api/analyze-session
 * Orchestrates the flow: Perplexity analysis → Supabase save → Response
 */
export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeSessionResponse>> {
  try {
    // Step 1: Parse and validate request body
    const body: AnalyzeSessionRequest = await request.json();

    if (!body.transcript || !body.userId) {
      return NextResponse.json(
        {
          track: 'Content Creation',
          reason: 'Fallback – missing transcript or userId',
          saved: false,
        } as AnalyzeSessionResponse,
        { status: 400 }
      );
    }

    console.log(`[analyze-session] Analyzing session for user ${body.userId}...`);

    // Step 2: Get Perplexity API key
    const PPLX_API_KEY = process.env.PPLX_API_KEY;

    if (!PPLX_API_KEY) {
      console.error('[analyze-session] PPLX_API_KEY environment variable is not set');
      return NextResponse.json(
        {
          track: 'Content Creation',
          reason: 'Fallback – API key not configured',
          saved: false,
        } as AnalyzeSessionResponse,
        { status: 500 }
      );
    }

    // Step 3: Call Perplexity API for analysis
    const userPrompt = `Analyze this career conversation transcript:\n\n${body.transcript}`;

    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PPLX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
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
      console.error('[analyze-session] Perplexity API error:', perplexityResponse.status, perplexityResponse.statusText);
      return NextResponse.json(
        {
          track: 'Content Creation',
          reason: 'Fallback – API error',
          saved: false,
        } as AnalyzeSessionResponse,
        { status: 200 }
      );
    }

    const perplexityData = await perplexityResponse.json();
    const content = perplexityData.choices?.[0]?.message?.content;

    if (!content) {
      console.error('[analyze-session] No content received from Perplexity API');
      return NextResponse.json(
        {
          track: 'Content Creation',
          reason: 'Fallback – no content',
          saved: false,
        } as AnalyzeSessionResponse,
        { status: 200 }
      );
    }

    // Step 4: Parse and validate Perplexity response
    let analysisResult: PerplexityAnalysisResult;

    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      analysisResult = JSON.parse(jsonStr);

      // Validate track name
      const validTracks = ['Game Design', 'Content Creation', 'Game Asset Artist'];
      const normalizedTrack = validTracks.find(
        (track) => track.toLowerCase() === analysisResult.track?.toLowerCase()
      );

      if (!normalizedTrack) {
        throw new Error(`Invalid track name: ${analysisResult.track}`);
      }

      analysisResult.track = normalizedTrack;
    } catch (parseError) {
      console.error('[analyze-session] Failed to parse Perplexity response:', parseError);
      return NextResponse.json(
        {
          track: 'Content Creation',
          reason: 'Fallback – parsing error',
          saved: false,
        } as AnalyzeSessionResponse,
        { status: 200 }
      );
    }

    console.log('[analyze-session] Perplexity analysis result:', analysisResult);

    // Step 5: Save to Supabase
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let saved = false;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Convert display track name to database format
        const dbTrackName = TRACK_MAPPING[analysisResult.track] || 'contentCreation';

        // Prepare career_data with transcript and analysis
        const careerData = {
          assigned_track: analysisResult.track,
          session_transcript: body.transcript,
          analysis_reason: analysisResult.reason,
          call_id: body.callId || null,
          duration: body.duration || 0,
          analyzed_at: new Date().toISOString(),
        };

        // Update user profile
        const { error } = await supabase
          .from('user_profiles')
          .upsert(
            {
              user_id: body.userId,
              assigned_track: dbTrackName,
              career_data: careerData,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id',
            }
          );

        if (error) {
          console.error('[analyze-session] Supabase error:', error);
        } else {
          console.log(`[analyze-session] Saved to Supabase for user ${body.userId}`);
          saved = true;
        }
      } catch (supabaseError) {
        console.error('[analyze-session] Error saving to Supabase:', supabaseError);
      }
    } else {
      console.warn('[analyze-session] Supabase not configured, skipping database save');
    }

    // Step 6: Return response
    return NextResponse.json(
      {
        track: analysisResult.track as 'Game Design' | 'Content Creation' | 'Game Asset Artist',
        reason: analysisResult.reason,
        saved,
      } as AnalyzeSessionResponse,
      { status: 200 }
    );
  } catch (error) {
    // Log the error for diagnostics
    console.error('[analyze-session] Unexpected error:', error);

    // Return fallback response
    return NextResponse.json(
      {
        track: 'Content Creation',
        reason: 'Fallback – unexpected error',
        saved: false,
      } as AnalyzeSessionResponse,
      { status: 200 }
    );
  }
}
