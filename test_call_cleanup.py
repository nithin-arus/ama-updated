#!/usr/bin/env python3
"""
Quick test to verify call cleanup functionality works correctly.
This script starts a call and immediately ends it to verify billing prevention.
"""

import sys
import os

# Add parent directory to path to import our module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from start_ultravox_call import UltravoxCallManager


def test_cleanup():
    """Test starting and ending a call."""

    # Your credentials
    API_KEY = "Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"
    AGENT_ID = "0f1cf764-bec8-447c-a692-2cb1b77ff452"

    print("=" * 60)
    print("Testing Ultravox Call Cleanup Functionality")
    print("=" * 60)

    try:
        # Initialize manager
        manager = UltravoxCallManager(api_key=API_KEY, agent_id=AGENT_ID)

        # Start call
        print("\n1. Starting call...")
        result = manager.start_call()
        call_id = result['callId']
        print(f"   ✓ Call started: {call_id}")
        print(f"   Billing Status: {result['billingStatus']}")

        # Immediately end call to prevent charges
        print("\n2. Ending call immediately...")
        success = manager.end_call()

        if success:
            print("   ✓ Call ended successfully")
            print("\n✅ Test PASSED: Call cleanup works correctly!")
            print("   Charges should be minimal since call ended immediately.")
            return 0
        else:
            print("   ✗ Failed to end call")
            print("\n❌ Test FAILED: Cleanup did not work")
            return 1

    except Exception as e:
        print(f"\n❌ Test FAILED with error: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(test_cleanup())
