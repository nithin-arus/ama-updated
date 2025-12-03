/**
 * Ultravox Call Manager using official SDK
 * Handles real-time voice calls with proper WebRTC integration
 */

import { UltravoxSession } from 'ultravox-client';

export interface UltravoxCallState {
  status: string;
  isActive: boolean;
  transcripts: Array<{
    text: string;
    isFinal: boolean;
    speaker: string;
    medium: string;
  }>;
  error: string | null;
}

export class UltravoxManager {
  private session: UltravoxSession;
  private onStateChange: (state: UltravoxCallState) => void;
  private currentState: UltravoxCallState;

  constructor(onStateChange: (state: UltravoxCallState) => void) {
    this.session = new UltravoxSession();
    this.onStateChange = onStateChange;
    this.currentState = {
      status: 'disconnected',
      isActive: false,
      transcripts: [],
      error: null,
    };

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.session.addEventListener('status', () => {
      const status = (this.session as any).status || 'disconnected';
      console.log('[UltravoxManager] Status changed:', status);

      this.currentState = {
        ...this.currentState,
        status,
        isActive: status === 'listening' || status === 'thinking' || status === 'speaking',
      };

      this.onStateChange(this.currentState);
    });

    this.session.addEventListener('transcripts', () => {
      const transcripts = (this.session as any).transcripts || [];
      console.log('[UltravoxManager] Transcripts updated:', transcripts.length);

      this.currentState = {
        ...this.currentState,
        transcripts,
      };

      this.onStateChange(this.currentState);
    });
  }

  async startCall(): Promise<void> {
    try {
      console.log('[UltravoxManager] Starting call...');

      // Call the Next.js API route to create the call
      const response = await fetch('/api/start-voice-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to start call: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();

      if (!data.joinUrl) {
        throw new Error('No joinUrl received from API');
      }

      console.log('[UltravoxManager] Joining call with URL:', data.joinUrl);

      // Join the call using the WebSocket URL
      this.session.joinCall(data.joinUrl);

    } catch (error) {
      console.error('[UltravoxManager] Error starting call:', error);
      this.currentState = {
        ...this.currentState,
        error: error instanceof Error ? error.message : 'Unknown error',
        isActive: false,
      };
      this.onStateChange(this.currentState);
      throw error;
    }
  }

  endCall(): void {
    console.log('[UltravoxManager] Ending call');
    try {
      this.session.leaveCall();
    } catch (error) {
      console.error('[UltravoxManager] Error ending call:', error);
    }
  }

  getTranscripts(): Array<{ text: string; isFinal: boolean; speaker: string; medium: string }> {
    return this.currentState.transcripts;
  }

  getFullTranscript(): string {
    return this.currentState.transcripts
      .filter((t) => t.isFinal)
      .map((t) => t.text)
      .join(' ');
  }

  mute(): void {
    try {
      (this.session as any).isMuted = true;
    } catch (error) {
      console.error('[UltravoxManager] Error muting:', error);
    }
  }

  unmute(): void {
    try {
      (this.session as any).isMuted = false;
    } catch (error) {
      console.error('[UltravoxManager] Error unmuting:', error);
    }
  }
}
