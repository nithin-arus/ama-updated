# Perplexity API Integration Guide

## Overview

This guide documents the integration of Perplexity AI API for analyzing Ultravox voice call transcripts and assigning career tracks to users.

## Architecture

### Flow Diagram

```
User completes Ultravox call
    ↓
VoiceCallModal.handleCallEnd()
    ↓
analyzeAndSaveSession(transcript, userId, callId, duration)
    ↓
POST /api/analyze-session
    ↓
├─→ Perplexity API (analyze transcript → determine track)
└─→ Supabase (save track + transcript + reason to user_profiles)
    ↓
Return track to frontend
    ↓
Generate content for assigned track
    ↓
Redirect user to dashboard
```

## Implementation Details

### 1. Environment Variables (`.env.local`)

```env
# Perplexity API Configuration
# Model: sonar-pro (or sonar-small-chat for cost-effective option)
PPLX_API_KEY=YOUR_PERPLEXITY_API_KEY

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Ultravox API Configuration
ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY
NEXT_PUBLIC_ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY
```

### 2. API Route (`/api/analyze-session`)

**Location:** `src/app/api/analyze-session/route.ts`

**Endpoint:** `POST /api/analyze-session`

**Request Body:**
```typescript
{
  transcript: string;     // The full conversation transcript
  userId: string;         // Supabase user ID
  callId?: string;        // Optional Ultravox call ID
  duration?: number;      // Optional call duration in seconds
}
```

**Response:**
```typescript
{
  track: 'Game Design' | 'Content Creation' | 'Game Asset Artist';
  reason: string;         // One-sentence rationale from Perplexity
  saved: boolean;         // Whether data was saved to Supabase
}
```

**What it does:**

1. **Validates input** - Ensures transcript and userId are present
2. **Calls Perplexity API** - Sends transcript to `sonar-pro` model for analysis
3. **Parses response** - Extracts track and reason from JSON response
4. **Maps track names** - Converts display names to database format:
   - "Game Design" → `gameDesign`
   - "Content Creation" → `contentCreation`
   - "Game Asset Artist" → `artDesign`
5. **Saves to Supabase** - Updates `user_profiles` table with:
   - `assigned_track` (database format)
   - `career_data` (JSON object with transcript, reason, metadata)
6. **Returns result** - Sends track (display format) back to frontend

### 3. Frontend Integration

**Location:** `src/components/VoiceCallModal.tsx`

**Key Changes:**

```typescript
// Import new function and auth hook
import { analyzeAndSaveSession } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

// Get user ID
const { userId } = useAuth();

// In handleCallEnd function:
if (userId) {
  // Use new endpoint (Perplexity + Supabase)
  const { track, reason } = await analyzeAndSaveSession(
    transcriptText,
    userId,
    callData.callId,
    callData.duration
  );
  
  // Generate content for the track
  const contentResponse = await fetch(`/api/generate-content?track=${track}`);
  const careerData = await contentResponse.json();
  
  // Save to localStorage
  localStorage.setItem('ama-assigned-track', track);
  // ... etc
} else {
  // Fallback for non-authenticated users
  await generateCareerMap(ultravoxResponse);
}
```

### 4. Utility Function

**Location:** `src/utils/api.ts`

```typescript
export async function analyzeAndSaveSession(
  transcript: string,
  userId: string,
  callId?: string,
  duration?: number
): Promise<{ track: TrackType; reason: string }> {
  const response = await fetch('/api/analyze-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, userId, callId, duration }),
  });

  const result = await response.json();
  return {
    track: result.track,
    reason: result.reason,
  };
}
```

## Perplexity API Details

### Model Used
- **Primary:** `sonar-pro` - More accurate, better reasoning
- **Alternative:** `sonar-small-chat` - Faster, more cost-effective

### System Prompt

The system prompt instructs Perplexity to:
1. Act as a gaming industry career counselor
2. Analyze the transcript for interests and skills
3. Choose ONE track from:
   - Game Design (game mechanics, systems, gameplay)
   - Content Creation (videos, streaming, writing)
   - Game Asset Artist (art, 3D, 2D, modeling)
4. Return strict JSON: `{ "track": "...", "reason": "..." }`

### Parameters
```json
{
  "model": "sonar-pro",
  "temperature": 0.1,      // Low for consistency
  "max_tokens": 500,       // Enough for detailed reason
  "messages": [
    { "role": "system", "content": "<system_prompt>" },
    { "role": "user", "content": "<transcript>" }
  ]
}
```

## Database Schema

### Table: `user_profiles`

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  assigned_track TEXT CHECK (assigned_track IN ('gameDesign', 'artDesign', 'contentCreation')),
  career_data JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id)
);
```

### Saved Career Data Structure

```json
{
  "assigned_track": "Game Design",
  "session_transcript": "Full transcript text...",
  "analysis_reason": "User showed interest in game mechanics and level design.",
  "call_id": "abc123...",
  "duration": 180,
  "analyzed_at": "2025-11-30T19:00:00.000Z"
}
```

## Track Name Mappings

| Display Format (Frontend/Perplexity) | Database Format | Description |
|---------------------------------------|-----------------|-------------|
| `Game Design` | `gameDesign` | Game mechanics, systems, gameplay |
| `Content Creation` | `contentCreation` | Videos, streaming, content |
| `Game Asset Artist` | `artDesign` | 3D/2D art, modeling, visuals |

## Error Handling & Fallbacks

The integration includes multiple fallback layers:

1. **Missing API Key** → Returns `'Content Creation'` with reason "Fallback – API key not configured"
2. **Perplexity API Error** → Returns `'Content Creation'` with reason "Fallback – API error"
3. **Parse Error** → Returns `'Content Creation'` with reason "Fallback – parsing error"
4. **Supabase Error** → Logs error, continues with `saved: false`
5. **User Not Authenticated** → Uses old `generateCareerMap` flow

All fallbacks are logged to console for debugging.

## Testing the Integration

### 1. Manual Test Flow

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the app and start a voice call**

3. **Complete the call** - The system will:
   - Extract transcript from Ultravox
   - Send to `/api/analyze-session`
   - Call Perplexity API
   - Save to Supabase
   - Return assigned track

4. **Check the console** for logs:
   ```
   [VoiceCallModal] Processing call end: {...}
   [analyze-session] Analyzing session for user abc123...
   [analyze-session] Perplexity analysis result: { track: 'Game Design', reason: '...' }
   [analyze-session] Saved to Supabase for user abc123
   [VoiceCallModal] Session analyzed: { track: 'Game Design', reason: '...' }
   ```

5. **Verify in Supabase:**
   - Go to Supabase Dashboard → Table Editor → user_profiles
   - Check that `assigned_track` and `career_data` are populated

### 2. API Testing with cURL

```bash
# Test the analyze-session endpoint directly
curl -X POST http://localhost:3000/api/analyze-session \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "I love creating game levels and designing interactive puzzles for players. I enjoy thinking about game mechanics and how to make them fun.",
    "userId": "test-user-123",
    "callId": "test-call-456",
    "duration": 120
  }'

# Expected response:
# {
#   "track": "Game Design",
#   "reason": "User expressed interest in level design and game mechanics.",
#   "saved": true
# }
```

### 3. Checking Ultravox Call Transcript

The `UltravoxCallManager` class in `src/lib/ultravox-call.ts` provides:

```typescript
getCallData(): {
  transcript: string;
  duration: number;
  callId: string | null;
  metadata: any;
}
```

You can verify the transcript is being captured correctly by checking the console logs during a call.

## Performance Considerations

### API Latency
- **Perplexity API:** ~2-5 seconds for analysis
- **Supabase Write:** ~200-500ms
- **Total:** ~2-6 seconds for complete flow

### Cost Optimization
- Using `sonar-pro` for accuracy
- Can switch to `sonar-small-chat` for lower cost
- Temperature set to 0.1 for consistency (reduces retries)

### Caching
Currently no caching is implemented. Could add:
- Cache Perplexity results for identical transcripts
- Rate limiting per user

## Troubleshooting

### Issue: "Fallback – API key not configured"

**Solution:**
1. Check `.env.local` has `PPLX_API_KEY`
2. Restart development server after adding env vars
3. Verify key is valid on Perplexity dashboard

### Issue: "Fallback – parsing error"

**Possible causes:**
1. Perplexity returned non-JSON response
2. Track name doesn't match expected values

**Solution:**
- Check console logs for raw Perplexity response
- Verify system prompt is correctly formatted
- Update track validation logic if needed

### Issue: Data not saving to Supabase

**Checklist:**
1. ✓ User is authenticated (check `userId` is not null)
2. ✓ Supabase env vars are set
3. ✓ RLS policies allow insert/update
4. ✓ Track name mapping is correct
5. ✓ Check Supabase logs for errors

### Issue: Transcript is empty

**Possible causes:**
1. Ultravox events not being captured
2. Call ended before transcript generated

**Solution:**
- Check `UltravoxCallManager` event handlers
- Verify transcript array is being populated during call
- Add debug logs in `handleCallEvent` method

## Files Modified/Created

### Created
- ✅ `src/app/api/analyze-session/route.ts` - New API endpoint
- ✅ `PERPLEXITY_INTEGRATION_GUIDE.md` - This documentation

### Modified
- ✅ `.env.local` - Added new Perplexity API key
- ✅ `src/lib/perplexity-client.ts` - Updated API endpoint
- ✅ `src/app/api/analyze-conversation/route.ts` - Updated to sonar-pro
- ✅ `src/utils/api.ts` - Added analyzeAndSaveSession function
- ✅ `src/components/VoiceCallModal.tsx` - Integrated new flow

## Next Steps & Enhancements

### Potential Improvements

1. **Streaming Responses**
   - Use Perplexity's streaming API for real-time analysis
   - Show progress to user during analysis

2. **Multi-Track Recommendations**
   - Instead of one track, get top 3 with confidence scores
   - Let user choose from recommendations

3. **Retry Logic**
   - Add exponential backoff for API failures
   - Queue failed requests for later retry

4. **Analytics**
   - Track Perplexity response times
   - Monitor track distribution
   - A/B test different prompts

5. **Transcript Enhancement**
   - Clean up filler words before sending to Perplexity
   - Add speaker diarization (user vs AI agent)
   - Summarize long transcripts

## Support & Resources

- **Perplexity API Docs:** https://docs.perplexity.ai
- **Ultravox Docs:** https://docs.ultravox.ai
- **Supabase Docs:** https://supabase.com/docs

## Summary

This integration successfully orchestrates:
1. ✅ Ultravox voice call transcript extraction
2. ✅ Perplexity AI career track analysis
3. ✅ Supabase database persistence
4. ✅ Frontend feedback and redirection

All components work together to provide a seamless user experience for career assessment through voice interaction.
