# API Configuration Guide

This document explains how to properly configure the Perplexity AI and Ultravox APIs for the AMA Career Platform.

## Overview

The AMA Career Platform uses two main external APIs:

1. **Ultravox API** - For real-time voice conversations and career assessments
2. **Perplexity AI API** - For analyzing conversation transcripts and determining career tracks

## Security Notice

**IMPORTANT**: Never commit API keys to version control. All API keys should be stored in `.env.local` which is already included in `.gitignore`.

## Environment Variables Setup

### 1. Copy the Example File

```bash
cp .env.example .env.local
```

### 2. Get Your API Keys

#### Ultravox API Key

1. Visit [https://ultravox.ai/](https://ultravox.ai/)
2. Sign up or log in to your account
3. Navigate to your API settings
4. Copy your API key

#### Perplexity AI API Key

1. Visit [https://www.perplexity.ai/](https://www.perplexity.ai/)
2. Sign up or log in to your account
3. Go to API settings
4. Generate and copy your API key

### 3. Configure .env.local

Edit `/Users/NithinAwasome/Downloads/AMA/.env.local` and replace the placeholder values:

```bash
# Ultravox API Configuration
NEXT_PUBLIC_ULTRAVOX_API_KEY=your_actual_ultravox_key_here
ULTRAVOX_API_KEY=your_actual_ultravox_key_here

# Perplexity API Configuration
PPLX_API_KEY=your_actual_perplexity_key_here
```

**Note**:
- `NEXT_PUBLIC_ULTRAVOX_API_KEY` is used in client-side React components
- `ULTRAVOX_API_KEY` is used in server-side API routes
- Both should have the same value for Ultravox

## API Usage

### Ultravox API

**Purpose**: Real-time voice conversations for career assessment

**Endpoints Used**:
- `POST https://api.ultravox.ai/api/agents/AMA_Updated/calls` - Start voice call
- `POST https://api.ultravox.ai/api/calls/{callId}/mute` - Toggle mute
- `POST https://api.ultravox.ai/api/calls/{callId}/end` - End call
- `GET https://api.ultravox.ai/api/calls/{callId}/events` - Real-time event stream

**Files Using Ultravox**:
- `src/lib/ultravox-client.ts` - Client initialization and session management
- `src/lib/ultravox-call.ts` - Call management and real-time updates
- `src/app/api/start-voice-session/route.ts` - API route for starting sessions
- `src/components/VoiceCallModal.tsx` - UI component for voice calls

### Perplexity AI API

**Purpose**: Analyze conversation transcripts to determine career tracks

**Endpoint Used**:
- `POST https://api.perplexity.ai/v0/chat/completions`

**Model**: `pplx-70b-online`

**Parameters**:
- `max_tokens`: 500
- `temperature`: 0.1

**Career Tracks**:
- Game Design
- Content Creation
- Game Asset Artist

**Files Using Perplexity**:
- `src/lib/perplexity-client.ts` - Client for conversation analysis
- `src/app/api/analyze-conversation/route.ts` - API route for analysis

## Mock Mode (Development)

The platform includes mock clients for development without real API keys.

Mock mode is automatically enabled when:
- API keys are not set
- API keys are set to placeholder values (e.g., `your_ultravox_api_key_here`)
- API keys are set to `demo_key`

**Files**:
- `src/lib/mock-clients.ts` - Mock implementations for all APIs

**Mock Behavior**:
- Ultravox: Simulates voice call with pre-recorded transcript
- Perplexity: Analyzes keywords to determine career track
- Console logs will show "🎭 Using mock [Service] client for development"

## Testing API Configuration

### 1. Check Environment Variables

```bash
# Verify .env.local exists and contains your keys
cat .env.local

# Should show your actual API keys, not placeholders
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test Voice Session

1. Open the application in your browser
2. Navigate to the career assessment page
3. Click "Start Assessment"
4. Check browser console for:
   - ✅ "Starting Ultravox call with AMA_Updated agent..." (real API)
   - ❌ "🎭 Using mock Ultravox client for development" (mock mode - API keys not configured)

### 4. Test Conversation Analysis

After completing a voice session:

1. Check browser console/network tab for:
   - ✅ POST request to `/api/analyze-conversation` succeeds (real API)
   - ❌ "🎭 Using mock Perplexity client for development" (mock mode)

2. Verify career track is assigned:
   - Check the dashboard for your assigned career path
   - Should be one of: Game Design, Content Creation, or Game Asset Artist

## Troubleshooting

### Issue: "API key not configured" error

**Solution**: Ensure your `.env.local` file has real API keys (not placeholders)

### Issue: Mock clients are being used even with API keys

**Solution**:
1. Verify API keys don't contain placeholder text
2. Restart your development server: `npm run dev`
3. Clear browser cache and reload

### Issue: Ultravox call fails to start

**Solution**:
1. Verify `ULTRAVOX_API_KEY` is set in `.env.local`
2. Verify `NEXT_PUBLIC_ULTRAVOX_API_KEY` is also set (same value)
3. Check Ultravox API dashboard for quota/billing issues
4. Check browser console for detailed error messages

### Issue: Perplexity analysis returns fallback

**Solution**:
1. Verify `PPLX_API_KEY` is set correctly in `.env.local`
2. Check Perplexity API dashboard for quota/billing issues
3. Review server logs for API error messages

### Issue: CORS errors with Ultravox

**Solution**:
- Ultravox calls from client-side use `NEXT_PUBLIC_ULTRAVOX_API_KEY`
- Server-side API routes use `ULTRAVOX_API_KEY`
- Ensure both are set to the same value

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Rotate API keys regularly** - Update keys every 90 days
3. **Use separate keys for dev/prod** - Different environments should have different keys
4. **Monitor API usage** - Check dashboards for unusual activity
5. **Set API rate limits** - Configure limits on provider dashboards

## Cost Optimization

### Ultravox API
- Monitor call duration (billed per minute)
- End calls promptly when assessment is complete
- Use mock mode during development

### Perplexity AI API
- Calls are made only after voice session ends
- Uses `pplx-70b-online` model with 500 max tokens
- Low temperature (0.1) for consistent results

## API Response Formats

### Ultravox Session Response

```json
{
  "sessionId": "call_abc123",
  "token": "call_abc123",
  "callId": "call_abc123"
}
```

### Perplexity Analysis Response

```json
{
  "track": "Game Design",
  "reason": "User expressed interest in game mechanics and interactive systems"
}
```

## Support

For API-specific issues:
- Ultravox: [https://ultravox.ai/support](https://ultravox.ai/support)
- Perplexity: [https://www.perplexity.ai/support](https://www.perplexity.ai/support)

For platform issues:
- Check the main README.md
- Review console logs for error messages
- Verify all environment variables are set correctly
