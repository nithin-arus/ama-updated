# 🚀 Ultravox Call Management - Quick Reference

## ⚡ 30-Second Start

```bash
# Python Script
cd ~/Downloads/AMA && source venv/bin/activate && python3 start_ultravox_call.py

# Web Interface
open ~/Downloads/AMA/ultravox_web_example.html
```

## 📞 Your Credentials

```
API Key: Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN
Agent ID: 0f1cf764-bec8-447c-a692-2cb1b77ff452
```

## ✅ Charge Prevention Checklist

- [x] End button in web interface
- [x] Auto-cleanup on tab close
- [x] Auto-cleanup on page reload
- [x] Max duration limit (240s)
- [x] Python Ctrl+C handler
- [x] Python exit handler

## 🔒 How Billing Works

| Action | Billing? | Safe? |
|--------|----------|-------|
| Create call (API) | ❌ No | ✅ |
| Show joinUrl | ❌ No | ✅ |
| Connect WebRTC | ✅ Yes | ⚠️ |
| Disconnect WebRTC | ❌ No | ✅ |
| Max duration (240s) | Auto-end | ✅ |
| Tab close | Auto-end | ✅ |
| End button | Auto-end | ✅ |

## 🎯 Files Overview

```
start_ultravox_call.py       → Python script with cleanup
ultravox_web_example.html    → Web UI with 4 cleanup layers
test_call_cleanup.py         → Test script
ULTRAVOX_USAGE_GUIDE.md      → Full documentation
FINAL_IMPLEMENTATION.md      → Complete summary
```

## 💡 Common Commands

```bash
# Start Python script
source ~/Downloads/AMA/venv/bin/activate
python3 ~/Downloads/AMA/start_ultravox_call.py

# Run test
python3 ~/Downloads/AMA/test_call_cleanup.py

# Open web interface
open ~/Downloads/AMA/ultravox_web_example.html

# Check call status (replace CALL_ID)
curl "https://api.ultravox.ai/api/calls/CALL_ID" \
  -H "X-API-Key: Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"
```

## 🛡️ Safety Features

### Web Interface
1. **End Call Button** - Click to stop billing immediately
2. **beforeunload** - Warns + cleans up on tab close
3. **unload** - Final cleanup
4. **pagehide** - Mobile browser support

### Python Script
1. **atexit** - Cleanup on normal exit
2. **SIGINT** - Handle Ctrl+C
3. **SIGTERM** - Handle kill signals
4. **Status tracking** - Shows call info on exit

## ⏱️ Key Timings

- **Max Duration**: 240 seconds (4 minutes)
- **Join Timeout**: 20 seconds
- **Auto-end**: After max duration
- **Billing**: Only when WebRTC connected

## 🎨 Web Interface Features

- ✅ Start/End buttons
- ✅ Real-time duration counter
- ✅ Billing status display
- ✅ Call ID tracking
- ✅ Auto-cleanup warnings
- ✅ Responsive design

## 📊 Test Results

```
✅ Call creation: WORKS
✅ Status tracking: WORKS
✅ Cleanup handlers: WORKS
✅ Tab close protection: WORKS
✅ End button: WORKS
✅ Max duration: WORKS (240s)
```

## 🚨 Emergency: End Active Calls

```bash
# Get call status
curl "https://api.ultravox.ai/api/calls/YOUR_CALL_ID" \
  -H "X-API-Key: Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"

# Wait for call to end (max 240s), then:
curl -X DELETE "https://api.ultravox.ai/api/calls/YOUR_CALL_ID" \
  -H "X-API-Key: Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"
```

## 💰 Billing Safety

**No charges for:**
- ❌ Creating calls
- ❌ Showing joinUrl
- ❌ Calls without WebRTC connection

**Charges apply to:**
- ✅ Active WebRTC connections only

**Protection mechanisms:**
- ✅ Max duration (auto-end)
- ✅ End button
- ✅ Tab close handler
- ✅ Exit handlers

## 📖 Full Documentation

- `ULTRAVOX_USAGE_GUIDE.md` - Complete usage guide
- `FINAL_IMPLEMENTATION.md` - Implementation details
- `SUMMARY.md` - Technical summary

## ✨ Quick Tips

1. **Always use End button** when done
2. **Close tab if you forget** - auto-cleanup works
3. **Check Ultravox dashboard** to verify calls ended
4. **Test with short durations** during development
5. **Use web interface** for actual voice calls

---

**Status**: ✅ Ready for production
**Last Updated**: 2025-11-30
**Test Status**: ✅ All tests passing
