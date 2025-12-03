#!/bin/bash

# Test script for Perplexity Integration
# Run this to verify the /api/analyze-session endpoint is working

set -e

echo "=========================================="
echo "Testing Perplexity Integration"
echo "=========================================="
echo ""

# Test data
TRANSCRIPT="I love designing game levels and creating interactive puzzles. I enjoy thinking about game mechanics and how to make engaging gameplay experiences for players."
USER_ID="test-user-$(date +%s)"
CALL_ID="test-call-$(date +%s)"
DURATION=120

echo "Test Configuration:"
echo "  Transcript: ${TRANSCRIPT:0:80}..."
echo "  User ID: $USER_ID"
echo "  Call ID: $CALL_ID"
echo "  Duration: $DURATION seconds"
echo ""

# Make the API request
echo "Sending request to /api/analyze-session..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/analyze-session \
  -H "Content-Type: application/json" \
  -d "{
    \"transcript\": \"$TRANSCRIPT\",
    \"userId\": \"$USER_ID\",
    \"callId\": \"$CALL_ID\",
    \"duration\": $DURATION
  }")

# Split response body and status code
HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

echo "Response Status: $HTTP_STATUS"
echo ""
echo "Response Body:"
echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Check if successful
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Test PASSED - API endpoint is working!"
    
    # Extract track from response
    TRACK=$(echo "$HTTP_BODY" | jq -r '.track' 2>/dev/null)
    REASON=$(echo "$HTTP_BODY" | jq -r '.reason' 2>/dev/null)
    SAVED=$(echo "$HTTP_BODY" | jq -r '.saved' 2>/dev/null)
    
    echo ""
    echo "Analysis Results:"
    echo "  Track: $TRACK"
    echo "  Reason: $REASON"
    echo "  Saved to DB: $SAVED"
else
    echo "❌ Test FAILED - API returned status $HTTP_STATUS"
    exit 1
fi

echo ""
echo "=========================================="
echo "Test Complete"
echo "=========================================="
