# Server Context Error Fix

## ❌ Root Cause Found

**Error**: `TypeError: Cannot read properties of undefined (reading 'call')`

**Location**: `/src/utils/api.ts` - Multiple localStorage usage without browser checks

**Problem**: The utility functions in `src/utils/api.ts` were directly accessing `localStorage` without checking if running in browser context. When Next.js tries to render pages on the server (SSR) or during build time, `localStorage` is `undefined`, causing the error.

### Specific Issues Found:

1. **`saveCareerData()`** - Direct localStorage.setItem() call
2. **`loadCareerData()`** - Direct localStorage.getItem() call  
3. **`getAssignedTrack()`** - Direct localStorage.getItem() call
4. **`isCallCompleted()`** - Direct localStorage.getItem() call
5. **`generateCareerMap()`** - Direct localStorage.setItem() calls
6. **`loadCareerDataFromSupabase()`** - Direct localStorage.setItem() calls
7. **`clearAllData()`** - Direct localStorage access

## ✅ Fix Applied

Added `typeof window !== 'undefined'` checks to all localStorage usage:

### Before (Broken):
```typescript
export function saveCareerData(track: TrackType, data: CareerData): void {
  localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(data));
}

export function loadCareerData(track: TrackType): CareerData | null {
  const stored = localStorage.getItem(`ama-career-data-${track}`);
  return stored ? JSON.parse(stored) : null;
}
```

### After (Fixed):
```typescript
export function saveCareerData(track: TrackType, data: CareerData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(data));
  }
}

export function loadCareerData(track: TrackType): CareerData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`ama-career-data-${track}`);
  return stored ? JSON.parse(stored) : null;
}
```

## 🔧 Complete Changes Made

1. **`saveCareerData()`** - Added browser check before localStorage.setItem()
2. **`loadCareerData()`** - Added early return for server context
3. **`getAssignedTrack()`** - Added early return for server context  
4. **`isCallCompleted()`** - Added early return for server context
5. **`generateCareerMap()`** - Wrapped localStorage calls in browser check
6. **`loadCareerDataFromSupabase()`** - Added browser check for localStorage sync
7. **`clearAllData()`** - Wrapped localStorage operations in browser check

## 🎯 Why This Fixes The Error

- **Server-Safe**: Functions now return safe defaults (null/false) when running on server
- **No localStorage Access**: Server context never tries to access undefined localStorage
- **Build Success**: Static generation works because no browser APIs are called during build
- **Runtime Safety**: Client-side functionality works normally after hydration

## ✅ Verification

- **Build passes**: `pnpm build` completes successfully
- **No TypeScript errors**: All types are maintained
- **Server renders safely**: No more undefined.call errors
- **Client functionality preserved**: localStorage still works in browser
- **SSR/Hydration compatible**: No server/client mismatches

## 🔍 Pattern Applied

```typescript
// Safe server/client pattern
if (typeof window !== 'undefined') {
  // Browser-only code here
  localStorage.setItem(key, value);
} else {
  // Server context - return safe defaults
  return null; // or appropriate fallback
}
```

This ensures the application works in both server and client contexts without errors.
