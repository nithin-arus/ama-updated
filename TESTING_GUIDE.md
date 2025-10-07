# AMA Career Platform - Testing Guide

## 🎯 Overview
This guide provides step-by-step instructions to test the AMA Career Platform in development mode without requiring real API keys.

## 🚀 Quick Start

### 1. Environment Setup
Create `.env.local` with demo values:
```bash
# Demo environment variables for testing
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=demo_key
ULTRAVOX_API_KEY=demo_key
PPLX_API_KEY=demo_key
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start Development Server
```bash
pnpm dev
```

Access the app at: http://localhost:3000

## 🧪 Testing Checklist

### ✅ Authentication Flow
- [ ] **Sign Up**: Create new account with email/password
- [ ] **Sign In**: Login with existing credentials
- [ ] **OAuth Buttons**: Click Google sign-in (should show mock flow)
- [ ] **Password Reset**: Test forgot password flow
- [ ] **Logout**: Verify session clearing

### ✅ Voice Assessment Flow
- [ ] **Start Assessment**: Click "Start Voice Assessment" button
- [ ] **Mock Session**: Verify mock session creation (check console logs)
- [ ] **Voice Interface**: Test microphone controls (mock implementation)
- [ ] **Analysis**: Verify mock analysis returns career track
- [ ] **Redirect**: Confirm redirect to dashboard after completion

### ✅ Dashboard Functionality
- [ ] **Career Track Display**: Verify assigned track is shown
- [ ] **Progress Tracking**: Check XP and level display
- [ ] **Task List**: View available tasks for the track
- [ ] **Navigation**: Test navigation between sections

### ✅ Task Consumption
- [ ] **Video Tasks**: Test YouTube video embedding
- [ ] **Article Tasks**: Test iframe rendering and fallback
- [ ] **Mark Complete**: Test task completion and XP gain
- [ ] **Progress Sync**: Verify localStorage and Supabase sync

### ✅ Error Handling
- [ ] **Network Errors**: Test with network disabled
- [ ] **API Failures**: Verify graceful fallbacks
- [ ] **Loading States**: Check loading indicators
- [ ] **Error Messages**: Verify user-friendly error messages

### ✅ Accessibility
- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Screen Reader**: Test with browser screen reader
- [ ] **ARIA Labels**: Verify proper labeling
- [ ] **Focus Management**: Check focus handling in modals

## 🔍 Console Testing

### Expected Console Output
When running in mock mode, you should see:
```
🎭 Using mock Ultravox client for development
🎭 Using mock Perplexity client for development
🎭 Mock Supabase: Signing in with password
🎭 Mock Ultravox: Starting session
🎭 Mock Perplexity: Analyzing conversation
```

### Error Detection
Watch for:
- ❌ Missing dependency errors
- ❌ Hydration mismatches
- ❌ Network request failures
- ❌ TypeScript compilation errors

## 🧪 Automated Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run specific test suites
pnpm test -- --testNamePattern="auth"
pnpm test -- --testNamePattern="career-progress"
```

### E2E Tests (Playwright)
```bash
# Install Playwright browsers
pnpm exec playwright install

# Run E2E tests
pnpm exec playwright test

# Run with UI
pnpm exec playwright test --ui
```

### Load Testing
```bash
# Test API endpoints under load
pnpm run test:load
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'ts-debounce'"
**Solution**: Run `pnpm install` to ensure all dependencies are installed.

### Issue: Hydration mismatch errors
**Solution**: Check for client-side only components using `useEffect` and `mounted` state.

### Issue: Mock clients not working
**Solution**: Verify environment variables are set to `demo_key` or `http://localhost:54321`.

### Issue: TypeScript errors
**Solution**: Run `pnpm run type-check` to identify and fix type issues.

## 📊 Performance Testing

### Bundle Size Analysis
```bash
pnpm run analyze
```

### Performance Metrics
- [ ] **First Contentful Paint**: < 1.5s
- [ ] **Largest Contentful Paint**: < 2.5s
- [ ] **Cumulative Layout Shift**: < 0.1
- [ ] **Time to Interactive**: < 3.5s

## 🔒 Security Testing

### Authentication Security
- [ ] **Session Management**: Verify proper session handling
- [ ] **Token Storage**: Check secure token storage
- [ ] **CSRF Protection**: Verify CSRF tokens
- [ ] **XSS Prevention**: Test input sanitization

### API Security
- [ ] **Input Validation**: Test malformed inputs
- [ ] **Rate Limiting**: Verify rate limit handling
- [ ] **Error Information**: Check error message security

## 📱 Cross-Platform Testing

### Browser Compatibility
- [ ] **Chrome**: Latest version
- [ ] **Firefox**: Latest version
- [ ] **Safari**: Latest version
- [ ] **Edge**: Latest version

### Device Testing
- [ ] **Desktop**: 1920x1080, 1366x768
- [ ] **Tablet**: 768x1024, 1024x768
- [ ] **Mobile**: 375x667, 414x896

## 🚀 Production Readiness Checklist

### Environment Variables
- [ ] All 4 required env vars set in production
- [ ] Supabase URL and keys configured
- [ ] Ultravox API key configured
- [ ] Perplexity API key configured

### Database
- [ ] Supabase schema deployed
- [ ] RLS policies active
- [ ] Database migrations complete

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Log aggregation set up

## 📝 Test Results Template

```
## Test Results - [Date]

### Environment
- Node.js: [version]
- pnpm: [version]
- Browser: [browser/version]

### Test Results
- [ ] Authentication: PASS/FAIL
- [ ] Voice Assessment: PASS/FAIL
- [ ] Dashboard: PASS/FAIL
- [ ] Task Consumption: PASS/FAIL
- [ ] Error Handling: PASS/FAIL
- [ ] Accessibility: PASS/FAIL

### Issues Found
1. [Issue description]
2. [Issue description]

### Performance
- Bundle Size: [size]
- Load Time: [time]
- Memory Usage: [usage]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]
```

## 🎉 Success Criteria

The AMA Career Platform is ready for production when:
- ✅ All tests pass
- ✅ No console errors
- ✅ Performance metrics meet targets
- ✅ Accessibility standards met
- ✅ Security requirements satisfied
- ✅ Cross-platform compatibility verified
