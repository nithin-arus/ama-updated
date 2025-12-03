# 🚀 Deploying to Vercel

This guide will help you deploy the AMA Career Platform to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- GitHub repository with your code
- API keys configured (Supabase, Ultravox, Perplexity)

## Quick Deployment (3 Steps)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..." → "Project"**
3. **Import** your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click **"Deploy"** (it will fail because env vars aren't set yet - that's OK!)

### Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add the following variables:

#### Required for All Features:

| Variable Name | Value | Where to Get |
|--------------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_ULTRAVOX_API_KEY` | Your Ultravox API key | [Ultravox Dashboard](https://ultravox.ai/) |
| `ULTRAVOX_API_KEY` | Same as above | Same as above |
| `PPLX_API_KEY` | Your Perplexity API key | [Perplexity AI](https://www.perplexity.ai/) |

**Important:**
- Set all variables for **Production**, **Preview**, and **Development** environments
- Click **"Save"** after adding all variables

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **"..."** → **"Redeploy"**
4. Wait 1-2 minutes for build to complete
5. Click **"Visit"** to see your live site!

---

## Vercel Configuration Explained

The project is configured for optimal Vercel deployment:

### ✅ What's Already Configured:

1. **`next.config.js`** - Optimized for Vercel's serverless infrastructure
   - Removed `output: 'standalone'` (incompatible with Vercel)
   - Enabled SWC minification for faster builds
   - React strict mode enabled

2. **API Routes** - All serverless-compatible
   - `/api/start-voice-session` - Starts Ultravox voice calls
   - `/api/analyze-conversation` - Analyzes transcripts with Perplexity
   - `/api/generate-content` - Generates career path content

3. **Environment Variables** - Properly scoped
   - `NEXT_PUBLIC_*` variables are exposed to browser
   - Server-only variables (like `PPLX_API_KEY`) are kept private

---

## Post-Deployment Checklist

After deployment, verify everything works:

### ✅ Test Authentication
1. Visit your Vercel URL (e.g., `https://ama-career.vercel.app`)
2. Click **"Sign Up"**
3. Create an account with email/password
4. Check that you can sign in/out

### ✅ Test Voice Assessment
1. Click **"Talk to AI Assistant"** on home page
2. Allow microphone access
3. Have a brief conversation with AMA
4. Check that conversation completes successfully

### ✅ Test Career Analysis
1. Complete the voice assessment
2. Verify you're redirected to dashboard
3. Check that your assigned track appears correctly

---

## Troubleshooting

### Build Fails
- **Error:** `Module not found` or TypeScript errors
- **Fix:** Run `npm run build` locally first to catch errors

### Environment Variables Not Working
- **Error:** "API key not configured" or "Supabase Not Configured"
- **Fix:**
  1. Verify all env vars are set in Vercel dashboard
  2. Redeploy after adding variables
  3. Check you set them for all environments (Production/Preview/Development)

### API Routes Timeout
- **Error:** 504 Gateway Timeout
- **Fix:** Check `vercel.json` has `maxDuration: 60` for API routes

### Supabase Connection Issues
- **Error:** "Failed to connect to Supabase"
- **Fix:**
  1. Add Vercel domain to Supabase allowed origins
  2. Go to Supabase Dashboard → Authentication → URL Configuration
  3. Add `https://your-app.vercel.app` to Site URL and Redirect URLs

---

## Summary

Your app is now Vercel-ready! ✅

**To deploy:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Redeploy

That's it! 🚀
