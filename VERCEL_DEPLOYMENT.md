# Vercel Production Deployment Configuration

## Required Environment Variables

Set the following variables in your Vercel Project Settings (Settings > Environment Variables):

### Core Application Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL | `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public API key for client-side auth | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### API Integration Variables

| Variable | Description | Purpose |
|----------|-------------|---------|
| `ULTRAVOX_API_KEY` | Ultravox API key for real-time audio/video | Voice session processing |
| `PPLX_API_KEY` | Perplexity API key for AI analysis | Conversation analysis endpoints |

## Configuration Steps

### 1. Add Environment Variables

**Via Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope:
   - **Production**: Live environment
   - **Preview**: Pull request previews
   - **Development**: Local development (optional)

**Via Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ULTRAVOX_API_KEY
vercel env add PPLX_API_KEY
```

### 2. Edge Functions Configuration

For real-time audio/video streaming (Ultravox integration):

1. **Enable Edge Functions** in Vercel Project Settings
2. **Configure routes** that need low-latency streaming:
   - `/api/start-voice-session`
   - `/api/analyze-conversation`
3. **Benefits**: Improved cold start latency and WebRTC reliability

### 3. Security Checklist

- ✅ **Never commit secrets** to repository
- ✅ **Use Vercel dashboard** for production secrets
- ✅ **Verify all variables** are present before deployment
- ✅ **Test in Preview** environment first
- ✅ **Scope variables** appropriately (Production/Preview/Development)

## Deployment Verification

### Pre-Deployment Checklist

- [ ] All 4 environment variables configured
- [ ] Supabase URL and keys validated
- [ ] Ultravox API key tested
- [ ] Perplexity API key tested
- [ ] Edge Functions enabled (if using real-time features)

### Post-Deployment Testing

1. **Authentication**: Test Supabase auth flows
2. **Voice Sessions**: Verify Ultravox integration
3. **AI Analysis**: Test Perplexity endpoints
4. **Database**: Confirm Supabase connectivity

## Troubleshooting

### Common Issues

**Missing Environment Variables:**
- Check Vercel Project Settings → Environment Variables
- Verify variable names match exactly (case-sensitive)
- Ensure proper scoping (Production/Preview)

**Supabase Connection Issues:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` format
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` validity
- Test Supabase project status

**API Integration Failures:**
- Validate `ULTRAVOX_API_KEY` and `PPLX_API_KEY`
- Check API rate limits and quotas
- Review API endpoint configurations

## Environment Variable Reference

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API Integrations
ULTRAVOX_API_KEY=your_ultravox_api_key
PPLX_API_KEY=your_perplexity_api_key
```

---

**Note**: This configuration ensures full functionality of the AMA application including authentication, voice processing, and AI-powered analysis features.
