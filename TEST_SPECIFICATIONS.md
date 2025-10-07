# Test Specifications for AMA Application

## 1. Unit Tests (MSW Mocking)

### Ultravox API Mocking
```typescript
// Mock Ultravox session/token endpoints
const ultravoxHandlers = [
  rest.post('/api/start-voice-session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessionId: 'mock-session-123',
        token: 'mock-token-456'
      })
    );
  }),
  
  // Error case
  rest.post('/api/start-voice-session', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: 'Ultravox service unavailable' })
    );
  })
];
```

**Assertions:**
- UI displays correct sessionId/token on successful response
- Error handling shows fallback UI when Ultravox fails
- Hook state updates correctly (loading → success/error)
- Session persistence across component re-renders

### Perplexity API Mocking
```typescript
// Mock Perplexity analysis endpoint
const perplexityHandlers = [
  rest.post('/api/analyze-conversation', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        track: 'gameDesign',
        reasoning: 'User showed interest in interactive systems',
        scores: { gameDesign: 85, webDev: 15 }
      })
    );
  }),
  
  // Rate limit fallback
  rest.post('/api/analyze-conversation', (req, res, ctx) => {
    return res(
      ctx.status(429),
      ctx.json({
        track: 'gameDesign',
        reasoning: 'Fallback – error',
        scores: { gameDesign: 100 }
      })
    );
  })
];
```

**Assertions:**
- JSON parsing handles valid Perplexity responses correctly
- Fallback logic triggers on rate limit (429 status)
- UI displays both success and fallback states appropriately
- Error boundaries catch and handle API failures gracefully

### Task Completion & XP Tracking
```typescript
// Mock task completion flow
const taskHandlers = [
  rest.post('/api/complete-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        taskId: 'task-123',
        xpEarned: 50,
        isCompleted: true
      })
    );
  })
];
```

**Assertions:**
- Task completion updates localStorage immediately
- XP calculation is accurate and persistent
- Progress sync to Supabase triggers on completion
- UI reflects completed state and disabled button
- Error handling for network failures during completion

## 2. Playwright E2E Test

### Full User Journey Test
```typescript
// Complete user flow simulation
test('Full user journey: voice assessment → auth → task completion → persistence', async ({ page }) => {
  // 1. Start voice assessment
  await page.goto('/');
  await page.click('[data-testid="start-assessment"]');
  
  // Verify voice session starts
  await expect(page.locator('[data-testid="voice-session"]')).toBeVisible();
  await expect(page.locator('[data-testid="session-id"]')).toContainText('session-');
  
  // 2. Authenticate
  await page.click('[data-testid="auth-modal-trigger"]');
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.fill('[data-testid="password-input"]', 'password123');
  await page.click('[data-testid="signin-button"]');
  
  // Verify dashboard loads
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  await expect(page.locator('[data-testid="user-profile"]')).toContainText('test@example.com');
  
  // 3. Complete a task
  await page.click('[data-testid="task-video-1"]');
  await expect(page.locator('[data-testid="youtube-player"]')).toBeVisible();
  await page.click('[data-testid="mark-complete-button"]');
  
  // Verify task completion
  await expect(page.locator('[data-testid="task-video-1"]')).toHaveClass(/completed/);
  await expect(page.locator('[data-testid="xp-counter"]')).toContainText('50');
  
  // 4. Refresh and verify persistence
  await page.reload();
  await expect(page.locator('[data-testid="task-video-1"]')).toHaveClass(/completed/);
  await expect(page.locator('[data-testid="xp-counter"]')).toContainText('50');
  await expect(page.locator('[data-testid="user-profile"]')).toContainText('test@example.com');
});
```

**Critical Assertions:**
- Voice session initiates and displays session ID
- Authentication flow completes successfully
- Dashboard renders user-specific data
- Task completion updates UI immediately
- XP tracking is accurate and persistent
- Page refresh maintains all completed states
- Error states display appropriate fallback UI

### Error Handling E2E
```typescript
// Test error scenarios
test('Error handling: network failures and fallbacks', async ({ page }) => {
  // Simulate network failure
  await page.route('/api/analyze-conversation', route => route.abort());
  
  await page.goto('/dashboard');
  await page.click('[data-testid="complete-assessment"]');
  
  // Verify fallback behavior
  await expect(page.locator('[data-testid="fallback-track"]')).toContainText('gameDesign');
  await expect(page.locator('[data-testid="fallback-reasoning"]')).toContainText('Fallback – error');
});
```

## 3. Load Test: /api/analyze-conversation

### Load Test Specification
```typescript
// Load test configuration
const loadTestConfig = {
  target: 'http://localhost:3000/api/analyze-conversation',
  requestsPerSecond: 1.2, // 72 requests per minute
  duration: '2m',
  payload: {
    raw: {
      sessionId: 'load-test-session',
      transcript: 'Test conversation transcript for load testing',
      duration: 120,
      metadata: { test: true }
    }
  }
};
```

**Test Scenarios:**
```typescript
// Normal load (60 requests/minute)
scenario('Normal load', () => {
  // Send 60 requests over 1 minute
  // Assert: All requests return 200 status
  // Assert: Response times < 2 seconds
  // Assert: No 500 errors or timeouts
});

// High load (120 requests/minute)
scenario('High load', () => {
  // Send 120 requests over 1 minute
  // Assert: Rate limiting triggers appropriately
  // Assert: Fallback responses return correct format
  // Assert: Server remains stable (no crashes)
});

// Sustained load (60 requests/minute for 10 minutes)
scenario('Sustained load', () => {
  // Send 60 requests/minute for 10 minutes
  // Assert: Performance remains consistent
  // Assert: Memory usage stays stable
  // Assert: No degradation in response times
});
```

**Expected Outcomes:**
- **Success Rate:** >99% requests return 200 status
- **Response Time:** P95 < 2 seconds, P99 < 5 seconds
- **Rate Limiting:** Graceful fallback when limits exceeded
- **Error Handling:** No 500 errors, proper error logging
- **Fallback Response:** `{ track: 'gameDesign', reasoning: 'Fallback – error', scores: { gameDesign: 100 } }`

### Load Test Assertions
```typescript
// Assert response format
assert(response.status).equals(200);
assert(response.body).hasProperty('track');
assert(response.body).hasProperty('reasoning');
assert(response.body).hasProperty('scores');

// Assert rate limit handling
if (response.status === 429) {
  assert(response.body.track).equals('gameDesign');
  assert(response.body.reasoning).equals('Fallback – error');
  assert(response.body.scores.gameDesign).equals(100);
}

// Assert performance metrics
assert(responseTime).lessThan(2000); // 2 seconds
assert(errorRate).lessThan(0.01); // <1% error rate
```

## Test Environment Setup

### Prerequisites
- MSW for API mocking
- Playwright for E2E testing
- Artillery/K6 for load testing
- Test database (separate from production)
- Mock Supabase client for unit tests

### Mock Data Requirements
```typescript
// Test user data
const testUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  profile: { name: 'Test User' }
};

// Test task data
const testTasks = [
  {
    id: 'task-video-1',
    type: 'video',
    url: 'https://youtube.com/watch?v=test123',
    xp: 50,
    isCompleted: false
  }
];

// Test session data
const testSession = {
  sessionId: 'test-session-456',
  token: 'test-token-789'
};
```

## Test Coverage Requirements

### Unit Tests: 90%+ coverage
- All API integration points
- Error handling paths
- State management logic
- Component rendering edge cases

### E2E Tests: Critical user flows
- Authentication flow
- Task completion workflow
- Data persistence
- Error recovery

### Load Tests: Performance validation
- Normal operating conditions
- Rate limit scenarios
- Sustained load handling
- Graceful degradation
