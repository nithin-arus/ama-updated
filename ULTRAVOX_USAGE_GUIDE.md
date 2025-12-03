# Ultravox Call Management Guide

## 📋 Overview

This guide explains how to properly manage Ultravox voice agent calls to prevent unexpected charges. It includes both Python and web-based examples.

## 🔑 Your Credentials

- **API Key**: `Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN`
- **Agent ID**: `0f1cf764-bec8-447c-a692-2cb1b77ff452`

## 💰 Understanding Ultravox Billing

### How Billing Works

1. **Call Creation** (API call) - Creates a call session but doesn't start billing
2. **Client Join** (WebRTC connection) - User connects and call becomes active
3. **Active Call** - Billing starts when client is connected
4. **Call End** - Billing stops when client disconnects
5. **Call Cleanup** (API DELETE) - Removes call record (only works AFTER call ends)

### Key Points

- ✅ **Billing starts** when a client joins the WebRTC session
- ✅ **Billing stops** when the client disconnects from WebRTC
- ⚠️ **You cannot DELETE ongoing calls** - they must end naturally first
- ⚠️ **Max duration** (240s default) will auto-end calls to prevent runaway charges
- ✅ **Best practice**: Always disconnect WebRTC clients when done

## 🐍 Python Script Usage

### Installation

```bash
cd ~/Downloads/AMA
python3 -m venv venv
source venv/bin/activate
pip install requests
```

### Quick Start

```bash
# Activate virtual environment
source venv/bin/activate

# Run the script
python3 start_ultravox_call.py
```

### What the Script Does

1. ✅ Creates a call session
2. ✅ Displays join URL and call details
3. ✅ Provides option to end call manually
4. ✅ **Auto-cleanup on Ctrl+C** - Prevents charges if interrupted
5. ✅ **Auto-cleanup on exit** - Ensures calls don't stay active

### Important Notes

⚠️ **The Python script only creates calls** - it doesn't connect via WebRTC, so:
- Calls created via script won't actually start billing until a client joins
- The script's cleanup attempts to end calls, but API may reject if call hasn't been joined yet
- This is actually **good** - no accidental charges from just running the script!

## 🌐 Web Interface Usage

### Opening the Interface

```bash
# Open in your default browser
open ~/Downloads/AMA/ultravox_web_example.html

# Or manually navigate to:
# file:///Users/NithinAwasome/Downloads/AMA/ultravox_web_example.html
```

### Features

✅ **Start Call Button** - Creates and joins a call session
✅ **End Call Button** - Properly disconnects and ends billing
✅ **Auto-cleanup on tab close** - Prevents charges if you forget
✅ **Auto-cleanup on page reload** - Prevents charges during refresh
✅ **Visual status indicators** - Know exactly when billing is active

### Automatic Charge Prevention

The web interface uses **4 layers of protection**:

1. **beforeunload** - Warns and cleans up when closing tab
2. **unload** - Final cleanup attempt
3. **pagehide** - Mobile browser support
4. **visibilitychange** - Detects tab switching

All cleanup attempts use `fetch()` with `keepalive: true` to ensure requests complete even during page navigation.

## 🔒 Best Practices to Prevent Charges

### DO ✅

1. **Always use the End Call button** when done
2. **Use the web interface** for actual calls (it properly manages WebRTC)
3. **Test with short calls first** to verify cleanup works
4. **Monitor billing status** in the Ultravox dashboard
5. **Set reasonable max duration** (default 240s is good)
6. **Use the cleanup handlers** provided in both scripts

### DON'T ❌

1. **Don't leave calls active** when not in use
2. **Don't refresh pages** without ending calls first (though auto-cleanup should handle it)
3. **Don't force-close browsers** (may prevent cleanup from running)
4. **Don't rely only on max duration** - actively end calls when done
5. **Don't create calls** without planning how to end them

## 📊 Monitoring Active Calls

### Check Call Status via API

```bash
curl -X GET \
  "https://api.ultravox.ai/api/calls/<CALL_ID>" \
  -H "X-API-Key: Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"
```

### Key Fields to Monitor

- `billingStatus`: BILLING_STATUS_PENDING → BILLING_STATUS_BILLED
- `ended`: null (ongoing) or timestamp (ended)
- `billedDuration`: null (not billed yet) or duration in seconds
- `endReason`: Why the call ended

## 🛠️ Troubleshooting

### Issue: "Cannot delete an ongoing call"

**Cause**: Trying to DELETE a call that's still active

**Solution**:
1. Client must disconnect from WebRTC first
2. Wait for call to end naturally (max duration or user disconnect)
3. Only then can you DELETE the call record

### Issue: Call won't end

**Cause**: Client still connected to WebRTC session

**Solution**:
1. Ensure client disconnects from WebSocket/WebRTC
2. Close browser tab with active call
3. Wait for max duration timeout (240s)

### Issue: Unexpected charges

**Cause**: Calls left active longer than intended

**Solution**:
1. Always use End Call button before closing
2. Verify calls ended in Ultravox dashboard
3. Set shorter max durations for testing
4. Use the provided cleanup handlers

## 📁 Files Included

| File | Purpose |
|------|---------|
| `start_ultravox_call.py` | Main Python script with full call management |
| `ultravox_web_example.html` | Web interface with auto-cleanup |
| `test_call_cleanup.py` | Quick test of cleanup functionality |
| `ULTRAVOX_USAGE_GUIDE.md` | This guide |

## 🚀 Example Workflows

### Workflow 1: Quick Test Call (Python)

```bash
source venv/bin/activate
python3 start_ultravox_call.py
# See call details
# Press 'e' to end or Ctrl+C to exit
```

### Workflow 2: Web Voice Call

1. Open `ultravox_web_example.html` in browser
2. Click "Start Call Session"
3. Use the voice interface
4. Click "End Call Session" when done
5. Verify status shows "Call ended successfully"

### Workflow 3: Integration into Your App

```javascript
// Create call
const response = await fetch(
  'https://api.ultravox.ai/api/agents/0f1cf764-bec8-447c-a692-2cb1b77ff452/calls',
  {
    method: 'POST',
    headers: {
      'X-API-Key': 'Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ templateContext: {} })
  }
);

const { callId, joinUrl } = await response.json();

// Connect to WebRTC using joinUrl...
// When done:

// Disconnect WebRTC client first
await webrtcClient.disconnect();

// Call will end automatically
// Optionally DELETE the call record (only after it ends)
```

## 📞 Support

- **Ultravox Documentation**: https://docs.ultravox.ai
- **API Reference**: https://api.ultravox.ai/docs
- **Your Agent Dashboard**: https://ultravox.ai/dashboard

## ⚡ Quick Reference

```bash
# Activate environment
source ~/Downloads/AMA/venv/bin/activate

# Run main script
python3 ~/Downloads/AMA/start_ultravox_call.py

# Run test
python3 ~/Downloads/AMA/test_call_cleanup.py

# Open web interface
open ~/Downloads/AMA/ultravox_web_example.html
```

---

**Remember**: The best way to prevent charges is to **actively end calls** when you're done, rather than relying solely on automatic cleanup!
