import { UltravoxResponse, AnalysisResponse } from '@/types';
import { shouldUseMockClients, MockPerplexityClient } from './mock-clients';

const SYSTEM_PROMPT = `You are an AI career counselor. You will receive the full transcript of a user's spoken conversation via voice assistant. Based on their words and stated interests, return the single most appropriate career track from this list:
"Game Design" (if the user expresses interest in game mechanics, interactive systems, gameplay ideas)
"Content Creation" (if the user talks about making videos, streaming, writing, or sharing content)
"Game Asset Artist" (if the user mentions art, visuals, design, 3D, 2D, drawing, modeling for games)
Your response must be a strict JSON object:
{ "track": "<best_matching_track>", "reason": "<one-sentence rationale>" }
where <best_matching_track> is one of "Game Design", "Content Creation", "Game Asset Artist", and reason briefly explains your decision.`;

export async function analyzeConversation(ultravoxJson: UltravoxResponse): Promise<AnalysisResponse> {
  // Check if we should use mock implementation
  if (shouldUseMockClients()) {
    console.log('🎭 Using mock Perplexity client for development');
    const mockClient = new MockPerplexityClient();
    return await mockClient.analyzeConversation(ultravoxJson.transcript, ultravoxJson.metadata);
  }

  // Use the provided API key
  const API_KEY = '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';

  const response = await fetch('https://api.perplexity.ai/v0/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'pplx-70b-online',
      stream: false,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: JSON.stringify(ultravoxJson),
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error('Perplexity API error:', response.status, response.statusText);
    // Fallback to Content Creation if Perplexity fails
    return {
      track: 'Content Creation',
      reason: 'Fallback – API error',
    };
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  try {
    const parsed = JSON.parse(content);
    
    // Validate and normalize track name
    const validTracks = ['Game Design', 'Content Creation', 'Game Asset Artist'];
    const normalizedTrack = validTracks.find(track => 
      track.toLowerCase() === parsed.track?.toLowerCase()
    ) || 'Content Creation';
    
    return {
      track: normalizedTrack as 'Game Design' | 'Content Creation' | 'Game Asset Artist',
      reason: parsed.reason || 'No reason provided',
    };
  } catch (error) {
    console.error('Failed to parse Perplexity response:', error);
    // Fallback to Content Creation
    return {
      track: 'Content Creation',
      reason: 'Fallback – parsing error',
    };
  }
}
