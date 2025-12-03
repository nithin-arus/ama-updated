# ✅ Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

- [x] **Build succeeds locally**
  ```bash
  npm run build
  ```
  Status: ✅ Build successful

- [x] **No TypeScript errors**
  ```bash
  npm run type-check
  ```
  Status: ✅ No errors

- [x] **Configuration optimized for Vercel**
  - `next.config.js` - ✅ Removed `output: 'standalone'`
  - `vercel.json` - ✅ Created with API timeout settings
  - `.gitignore` - ✅ Properly configured

- [x] **Environment variables documented**
  - See `VERCEL_DEPLOYMENT.md` for full guide
  - All 5 required variables listed

## Required Environment Variables

Copy these to Vercel Dashboard → Settings → Environment Variables:

```bash
# From your .env.local file:
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY
ULTRAVOX_API_KEY=YOUR_ULTRAVOX_API_KEY
PPLX_API_KEY=YOUR_PERPLEXITY_API_KEY
```

**Important:** Set for all environments (Production, Preview, Development)

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add all 5 variables above
   - Save

4. **Redeploy**
   - Deployments tab
   - Redeploy latest
   - Wait ~2 minutes

## Post-Deployment Tests

Visit your live URL and test:

- [ ] Home page loads
- [ ] Sign Up button works
- [ ] Sign In button works
- [ ] Voice assistant works (microphone access)
- [ ] Career Map page displays
- [ ] Dashboard shows after assessment
- [ ] No console errors (F12)

## Supabase Configuration

After first deployment, update Supabase:

1. **Go to:** Supabase Dashboard → Authentication → URL Configuration
2. **Add your Vercel URL to:**
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

## Troubleshooting

If deployment fails:

1. **Check build logs** in Vercel dashboard
2. **Verify all env vars** are set correctly
3. **Run `npm run build` locally** to catch errors first
4. **Check API routes** don't timeout (should complete in <60s)

## Success Criteria

✅ Build succeeds
✅ No TypeScript errors
✅ All pages load
✅ Authentication works
✅ Voice calls work
✅ Data persists in Supabase

---

**Ready to deploy?** Follow VERCEL_DEPLOYMENT.md for detailed instructions!
