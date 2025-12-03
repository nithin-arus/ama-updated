#!/bin/bash

echo "=========================================="
echo "Verifying Perplexity Integration Files"
echo "=========================================="
echo ""

FAILED=0

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 - MISSING!"
        FAILED=1
    fi
}

check_env_var() {
    if grep -q "$1" .env.local 2>/dev/null; then
        echo "✅ Environment variable: $1"
    else
        echo "❌ Environment variable: $1 - MISSING!"
        FAILED=1
    fi
}

echo "Checking Files Created:"
check_file "src/app/api/analyze-session/route.ts"
check_file "PERPLEXITY_INTEGRATION_GUIDE.md"
check_file "IMPLEMENTATION_SUMMARY.md"
check_file "test-perplexity-integration.sh"

echo ""
echo "Checking Files Modified:"
check_file "src/lib/perplexity-client.ts"
check_file "src/app/api/analyze-conversation/route.ts"
check_file "src/utils/api.ts"
check_file "src/components/VoiceCallModal.tsx"

echo ""
echo "Checking Environment Variables:"
check_env_var "PPLX_API_KEY"
check_env_var "NEXT_PUBLIC_SUPABASE_URL"
check_env_var "ULTRAVOX_API_KEY"

echo ""
echo "=========================================="
if [ $FAILED -eq 0 ]; then
    echo "✅ All checks passed! Integration is complete."
    echo ""
    echo "Next steps:"
    echo "1. Restart development server: npm run dev"
    echo "2. Run test script: ./test-perplexity-integration.sh"
    echo "3. Read IMPLEMENTATION_SUMMARY.md for usage guide"
else
    echo "❌ Some checks failed. Please review above."
fi
echo "=========================================="
