# 🚀 AMA Career Platform Setup Checklist

Follow this checklist to get your platform fully configured with authentication!

## ✅ Phase 1: Supabase Project Setup (5 minutes)

### 1.1 Create Supabase Project
- [ ] Go to https://supabase.com/dashboard
- [ ] Click "New Project"
- [ ] Name: "AMA Career Platform" (or your choice)
- [ ] Set database password (SAVE IT!)
- [ ] Choose region
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes for provisioning

### 1.2 Get Credentials
- [ ] Go to Settings > API in Supabase dashboard
- [ ] Copy **Project URL** (looks like `https://xxxxx.supabase.co`)
- [ ] Copy **anon/public API key** (long string starting with `eyJ...`)

### 1.3 Update Environment Variables
- [ ] Open `.env.local` in your project
- [ ] Replace `NEXT_PUBLIC_SUPABASE_URL` with your Project URL
- [ ] Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your API key
- [ ] Save the file

### 1.4 Set Up Database
- [ ] In Supabase, go to **SQL Editor**
- [ ] Click "New Query"
- [ ] Open `supabase/schema.sql` from this project
- [ ] Copy ALL the SQL code
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run"
- [ ] Wait for "Success" message

### 1.5 Restart Dev Server
```bash
# Stop the current server (Ctrl+C in terminal)
# Start it again
npm run dev
```
- [ ] Server restarted
- [ ] No errors in console
- [ ] Open http://localhost:3000

---

## ✅ Phase 2: Test Basic Authentication (2 minutes)

### 2.1 Test Email/Password Sign-Up
- [ ] Click "Sign In" button
- [ ] Click "Sign up" link
- [ ] Complete AMA voice assessment first (required!)
- [ ] Enter email and password
- [ ] Click "Create Account"
- [ ] Check your email for verification link
- [ ] Click verification link
- [ ] You should be signed in!

### 2.2 Verify Data in Supabase
- [ ] Go to Supabase > Table Editor
- [ ] Click on `user_profiles` table
- [ ] You should see your user profile row
- [ ] Verify `user_id` matches your auth user

### 2.3 Test Sign-Out and Sign-In
- [ ] Click your profile or sign-out button
- [ ] Sign out
- [ ] Click "Sign In" again
- [ ] Enter same email/password
- [ ] Click "Sign In"
- [ ] You should be signed in with data persisted

---

## ✅ Phase 3: Google OAuth Setup (15 minutes)

**This is OPTIONAL - email/password already works!**

### 3.1 Create Google OAuth App
Follow the detailed guide in `supabase/google-oauth-setup.md`:
- [ ] Create Google Cloud project
- [ ] Configure OAuth consent screen
- [ ] Create OAuth client ID
- [ ] Copy Client ID and Client Secret

### 3.2 Configure in Supabase
- [ ] Supabase > Authentication > Providers
- [ ] Find "Google"
- [ ] Toggle ON
- [ ] Paste Client ID
- [ ] Paste Client Secret
- [ ] Click "Save"

### 3.3 Test Google Sign-In
- [ ] Sign out from app
- [ ] Click "Sign In"
- [ ] Click "Sign in with Google"
- [ ] Should redirect to Google
- [ ] Sign in with Google account
- [ ] Should redirect back to dashboard
- [ ] Profile created in Supabase

---

## ✅ Phase 4: Verification & Testing

### 4.1 Complete User Flow
- [ ] Start as logged-out user
- [ ] Click "Talk to AMA"
- [ ] Complete voice assessment
- [ ] Sign up with email/password OR Google
- [ ] Career track assigned
- [ ] Dashboard shows personalized content
- [ ] Sign out and sign back in
- [ ] Data persists (same track, same progress)

### 4.2 Check Database
- [ ] Supabase > Table Editor > `user_profiles`
- [ ] Should see user with `assigned_track` filled
- [ ] `career_data` should have JSON data
- [ ] Timestamps should be set

### 4.3 Test RLS (Row Level Security)
- [ ] Create a second test user
- [ ] Sign in as User 1
- [ ] Should only see User 1's data
- [ ] Sign in as User 2
- [ ] Should only see User 2's data (not User 1's)

---

## 🎉 Success Criteria

When everything is working:
- ✅ No errors in browser console
- ✅ No "Supabase is not configured" warnings
- ✅ Can sign up with email/password
- ✅ (Optional) Can sign in with Google
- ✅ Career data saves to Supabase
- ✅ Data persists across sessions
- ✅ Multiple users can use the app independently

---

## 🐛 Troubleshooting

### "Supabase is not configured" warning still shows
**Solution**:
1. Check `.env.local` has real values (not placeholders)
2. Restart dev server: `npm run dev`
3. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### "Invalid API key" error
**Solution**:
1. Verify you copied the **anon/public** key (not service_role)
2. Check for extra spaces or missing characters
3. Go to Supabase > Settings > API and copy again

### Email verification not working
**Solution**:
1. Supabase > Authentication > Email Templates
2. Make sure templates are enabled
3. Check spam folder for verification email
4. For development, disable email verification: Authentication > Providers > Email > Confirm email = OFF

### Google OAuth redirect error
**Solution**:
1. Check redirect URI matches exactly in Google Cloud Console
2. Format: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
3. Wait 5 minutes after changes in Google Cloud
4. See `supabase/google-oauth-setup.md` for detailed troubleshooting

### Database query fails
**Solution**:
1. Check Supabase > SQL Editor for error messages
2. Verify all tables exist: Table Editor should show `user_profiles` and `career_progress`
3. Re-run the schema: Copy from `supabase/schema.sql` and run in SQL Editor
4. Check RLS policies: Table Editor > click table > RLS tab

---

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com/
- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2

---

## 🚀 Ready for Production?

Before deploying:
- [ ] Change all placeholder passwords
- [ ] Set up production Supabase project (separate from dev)
- [ ] Configure production OAuth (different client for prod)
- [ ] Set up email templates in Supabase
- [ ] Enable email confirmations
- [ ] Set up proper error logging
- [ ] Test with real users

---

## Current Status

Run through this checklist and mark items as you complete them. Once all checkmarks are done, your platform is fully configured! 🎉
