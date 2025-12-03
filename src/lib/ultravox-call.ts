/**
 * Ultravox Call Management System
 * Handles real-time voice calls with the AMA AI career counselor
 * Agent ID: 0f1cf764-bec8-447c-a692-2cb1b77ff452
 */

export interface UltravoxCallState {
  isActive: boolean;
  isMuted: boolean;
  callId: string | null;
  error: string | null;
  transcript: string[];
  duration: number;
}

export class UltravoxCallManager {
  private callId: string | null = null;
  private isMuted: boolean = false;
  private startTime: number = 0;
  private transcript: string[] = [];
  private eventSource: EventSource | null = null;
  private onStateChange: (state: UltravoxCallState) => void;
  private API_KEY: string;

  constructor(onStateChange: (state: UltravoxCallState) => void) {
    this.onStateChange = onStateChange;

    // Get API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_ULTRAVOX_API_KEY;
    if (!apiKey) {
      console.error('NEXT_PUBLIC_ULTRAVOX_API_KEY environment variable is not set');
      throw new Error('NEXT_PUBLIC_ULTRAVOX_API_KEY environment variable is not set');
    }
    this.API_KEY = apiKey;
  }

  async startCall(): Promise<void> {
    try {
      this.updateState({ isActive: false, isMuted: false, callId: null, error: null, transcript: [], duration: 0 });

      // Call the Next.js API route instead of calling Ultravox directly
      // This prevents CORS issues and keeps the API key secure on the server
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
      this.callId = data.callId;
      this.startTime = Date.now();
      this.transcript = [];

      // Set up real-time event stream
      this.setupEventStream();

      this.updateState({ 
        isActive: true, 
        isMuted: false, 
        callId: this.callId, 
        error: null, 
        transcript: this.transcript, 
        duration: 0 
      });

    } catch (error) {
      console.error('Error starting Ultravox call:', error);
      this.updateState({ 
        isActive: false, 
        isMuted: false, 
        callId: null, 
        error: error instanceof Error ? error.message : 'Unknown error', 
        transcript: this.transcript, 
        duration: 0 
      });
    }
  }

  private setupEventStream(): void {
    if (!this.callId) return;

    // Set up Server-Sent Events for real-time updates
    this.eventSource = new EventSource(`https://api.ultravox.ai/api/calls/${this.callId}/events`, {
      headers: {
        'X-API-Key': this.API_KEY,
      }
    } as any);

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleCallEvent(data);
      } catch (error) {
        console.error('Error parsing call event:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      this.updateState({ 
        isActive: false, 
        isMuted: this.isMuted, 
        callId: this.callId, 
        error: 'Connection lost', 
        transcript: this.transcript, 
        duration: this.getDuration() 
      });
    };
  }

  private handleCallEvent(data: any): void {
    switch (data.type) {
      case 'transcript':
        if (data.text) {
          this.transcript.push(data.text);
          this.updateState({ 
            isActive: true, 
            isMuted: this.isMuted, 
            callId: this.callId, 
            error: null, 
            transcript: [...this.transcript], 
            duration: this.getDuration() 
          });
        }
        break;
      case 'call_ended':
        this.endCall();
        break;
      case 'error':
        this.updateState({ 
          isActive: false, 
          isMuted: this.isMuted, 
          callId: this.callId, 
          error: data.message || 'Call error', 
          transcript: this.transcript, 
          duration: this.getDuration() 
        });
        break;
    }
  }

  toggleMute(): void {
    if (!this.callId) return;

    this.isMuted = !this.isMuted;
    
    // Send mute/unmute command to Ultravox
    fetch(`https://api.ultravox.ai/api/calls/${this.callId}/mute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.API_KEY,
      },
      body: JSON.stringify({ muted: this.isMuted }),
    }).catch(error => {
      console.error('Error toggling mute:', error);
    });

    this.updateState({ 
      isActive: true, 
      isMuted: this.isMuted, 
      callId: this.callId, 
      error: null, 
      transcript: this.transcript, 
      duration: this.getDuration() 
    });
  }

  async endCall(): Promise<void> {
    if (!this.callId) return;

    try {
      // End the call
      await fetch(`https://api.ultravox.ai/api/calls/${this.callId}/end`, {
        method: 'POST',
        headers: {
          'X-API-Key': this.API_KEY,
        },
      });
    } catch (error) {
      console.error('Error ending call:', error);
    }

    // Clean up
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.updateState({ 
      isActive: false, 
      isMuted: false, 
      callId: null, 
      error: null, 
      transcript: this.transcript, 
      duration: this.getDuration() 
    });

    this.callId = null;
    this.startTime = 0;
  }

  private getDuration(): number {
    if (!this.startTime) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  private updateState(updates: Partial<UltravoxCallState>): void {
    this.onStateChange({
      isActive: updates.isActive ?? false,
      isMuted: updates.isMuted ?? false,
      callId: updates.callId ?? null,
      error: updates.error ?? null,
      transcript: updates.transcript ?? [],
      duration: updates.duration ?? 0,
    });
  }

  getTranscript(): string {
    return this.transcript.join(' ');
  }

  getCallData(): { transcript: string; duration: number; callId: string | null; metadata: any } {
    return {
      transcript: this.getTranscript(),
      duration: this.getDuration(),
      callId: this.callId,
      metadata: {
        callId: this.callId,
        timestamp: new Date().toISOString(),
        transcriptSegments: this.transcript,
        totalDuration: this.getDuration(),
      },
    };
  }
}

