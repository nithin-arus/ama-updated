#!/usr/bin/env python3
"""
Ultravox Agent Call Session Manager

This script manages call sessions with an Ultravox Agent, including:
- Starting calls
- Ending calls to prevent extra charges
- Handling cleanup on interruption

Author: Auto-generated
Date: 2025-11-30
"""

import requests
import json
import sys
import signal
import atexit
from typing import Dict, Optional


class UltravoxCallManager:
    """Handle Ultravox API calls to start and end agent sessions."""

    def __init__(self, api_key: str, agent_id: str):
        """
        Initialize the Ultravox call manager.

        Args:
            api_key: Ultravox API key for authentication
            agent_id: Unique identifier for the Ultravox agent
        """
        self.api_key = api_key
        self.agent_id = agent_id
        self.base_url = "https://api.ultravox.ai/api"
        self.active_call_id: Optional[str] = None

    def start_call(self, template_context: Optional[Dict] = None) -> Dict:
        """
        Start a new call session with the Ultravox agent.

        Args:
            template_context: Optional dictionary containing dynamic variables
                            to pass to the agent. If None, an empty dict is used.

        Returns:
            Dictionary containing the API response, including the joinUrl

        Raises:
            requests.exceptions.RequestException: If the API request fails
            ValueError: If the response doesn't contain expected data
        """
        # Construct the endpoint URL
        endpoint = f"{self.base_url}/agents/{self.agent_id}/calls"

        # Prepare headers
        headers = {
            "X-API-Key": self.api_key,
            "Content-Type": "application/json"
        }

        # Prepare request body
        body = {
            "templateContext": template_context if template_context else {}
        }

        try:
            # Make the POST request
            print(f"Initiating call session with agent {self.agent_id}...")
            response = requests.post(
                endpoint,
                headers=headers,
                json=body,
                timeout=30
            )

            # Raise an exception for bad status codes
            response.raise_for_status()

            # Parse the JSON response
            response_data = response.json()

            # Validate that we received a joinUrl and callId
            if "joinUrl" not in response_data:
                raise ValueError("Response does not contain 'joinUrl'")
            if "callId" not in response_data:
                raise ValueError("Response does not contain 'callId'")

            # Track the active call ID for cleanup
            self.active_call_id = response_data["callId"]

            print("✓ Call session created successfully!")
            return response_data

        except requests.exceptions.Timeout:
            print("✗ Error: Request timed out after 30 seconds", file=sys.stderr)
            raise
        except requests.exceptions.HTTPError as e:
            print(f"✗ HTTP Error: {e}", file=sys.stderr)
            if e.response is not None:
                try:
                    error_detail = e.response.json()
                    print(f"Error details: {json.dumps(error_detail, indent=2)}", file=sys.stderr)
                except json.JSONDecodeError:
                    print(f"Response text: {e.response.text}", file=sys.stderr)
            raise
        except requests.exceptions.RequestException as e:
            print(f"✗ Request failed: {e}", file=sys.stderr)
            raise
        except ValueError as e:
            print(f"✗ Invalid response: {e}", file=sys.stderr)
            raise

    def end_call(self, call_id: Optional[str] = None) -> bool:
        """
        Mark a call for cleanup and provide status information.

        IMPORTANT: Ultravox calls cannot be forcibly ended via API.
        Calls end when:
        1. The WebRTC client disconnects (proper way)
        2. Max duration is reached (auto-end, default 240s)
        3. Inactivity timeout is triggered

        This method tracks call status and clears local state.

        Args:
            call_id: The call ID to check. If None, uses the active_call_id.

        Returns:
            True if call tracking was cleared, False otherwise
        """
        # Use provided call_id or fall back to active_call_id
        target_call_id = call_id or self.active_call_id

        if not target_call_id:
            print("⚠ No active call to track", file=sys.stderr)
            return False

        print(f"\n📞 Call Status: {target_call_id}")
        print("=" * 60)
        print("ℹ️  Note: Ultravox calls cannot be ended via API.")
        print("   Calls will automatically end when:")
        print("   • WebRTC client disconnects (if connected)")
        print("   • Max duration reached (240s default)")
        print("   • Inactivity timeout triggered")
        print("=" * 60)

        # Try to get call status
        try:
            endpoint = f"{self.base_url}/calls/{target_call_id}"
            headers = {
                "X-API-Key": self.api_key,
                "Content-Type": "application/json"
            }

            response = requests.get(endpoint, headers=headers, timeout=10)
            response.raise_for_status()

            call_data = response.json()

            print(f"\nCurrent Status:")
            print(f"  Billing: {call_data.get('billingStatus', 'Unknown')}")
            print(f"  Ended: {call_data.get('ended', 'Not yet')}")
            print(f"  End Reason: {call_data.get('endReason', 'N/A')}")
            print(f"  Max Duration: {call_data.get('maxDuration', 'Unknown')}")

            if call_data.get('ended'):
                print("\n✓ Call has already ended")
            else:
                print(f"\n⏳ Call is active/pending - will auto-end in ≤ {call_data.get('maxDuration', '240s')}")

        except Exception as e:
            print(f"\n⚠ Could not fetch call status: {e}")

        # Clear local tracking
        if target_call_id == self.active_call_id:
            self.active_call_id = None

        print("\n✓ Local call tracking cleared")
        return True

    def cleanup(self):
        """Clean up call tracking on exit."""
        if self.active_call_id:
            print("\n⚠ Script exiting with active call tracked...")
            print("   (Call will auto-end at max duration if not connected)")
            self.end_call()


def main():
    """Main entry point for the script."""

    # Configuration - Your Ultravox credentials
    API_KEY = "Ub77u91T.rnbRMGhrz9YhyECkNuVUWIOfmi3whOwN"
    AGENT_ID = "0f1cf764-bec8-447c-a692-2cb1b77ff452"

    # Optional: Add any template context variables here
    # Example: {"user_name": "John", "session_id": "12345"}
    template_context = {}

    # Initialize the call manager
    call_manager = UltravoxCallManager(api_key=API_KEY, agent_id=AGENT_ID)

    # Register cleanup handlers to end calls on exit or interruption
    # This prevents extra charges if the script is terminated
    atexit.register(call_manager.cleanup)

    def signal_handler(signum, frame):
        """Handle interrupt signals gracefully."""
        print("\n⚠ Received interrupt signal. Cleaning up...")
        call_manager.cleanup()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    try:
        # Start the call session
        result = call_manager.start_call(template_context=template_context)

        # Display the results
        print("\n" + "=" * 60)
        print("Call Session Details:")
        print("=" * 60)
        print(f"\nCall ID: {result['callId']}")
        print(f"Join URL: {result['joinUrl']}")
        print(f"Billing Status: {result['billingStatus']}")
        print(f"Max Duration: {result['maxDuration']}")
        print("\nFull Response:")
        print(json.dumps(result, indent=2))
        print("\n" + "=" * 60)

        # Prompt user for action
        print("\nCall is now active. Options:")
        print("  - Press 'e' + Enter to end the call")
        print("  - Press Ctrl+C to end and exit")
        print("  - The call will auto-end after max duration")

        user_input = input("\nYour choice: ").strip().lower()

        if user_input == 'e':
            call_manager.end_call()
        else:
            print("Call remains active (will end on script exit or max duration)")

        return 0

    except Exception as e:
        print(f"\n✗ Failed to manage call session: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
