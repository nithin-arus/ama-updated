'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { UltravoxManager, UltravoxCallState } from '@/lib/ultravox-manager';
import { analyzeAndSaveSession, generateCareerMap } from '@/utils/api';
import { UltravoxResponse } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import AuthModal from './AuthModal';
import ConfettiModal from './ConfettiModal';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type CallState = 'idle' | 'connecting' | 'active' | 'processing' | 'completed' | 'error';

export default function VoiceCallModal({ isOpen, onClose, onComplete }: VoiceCallModalProps) {
  const { userId } = useAuth();
  const [callState, setCallState] = useState<CallState>('idle');
  const [callData, setCallData] = useState<UltravoxCallState>({
    status: 'disconnected',
    isActive: false,
    transcripts: [],
    error: null,
  });
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfettiModal, setShowConfettiModal] = useState(false);
  const [assignedTrack, setAssignedTrack] = useState<string>('');
  const callManagerRef = useRef<UltravoxManager | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    }
  }, [isOpen]);

  // Watch for successful sign in after assessment
  useEffect(() => {
    if (showAuthModal && userId) {
      // User just signed in successfully
      setShowAuthModal(false);
      setShowConfettiModal(true);
      toast.success('Welcome! Your progress has been saved.');
    }
  }, [userId, showAuthModal]);

  const cleanup = () => {
    if (callManagerRef.current) {
      callManagerRef.current.endCall();
      callManagerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCallState('idle');
    setProgress(0);
    setIsMuted(false);
    setCallData({
      status: 'disconnected',
      isActive: false,
      transcripts: [],
      error: null,
    });
  };

  const handleCallStateChange = (state: UltravoxCallState) => {
    console.log('[VoiceCallModal] State changed:', state);
    setCallData(state);

    // Update call state based on Ultravox status
    if (state.status === 'listening' || state.status === 'thinking' || state.status === 'speaking') {
      if (callState !== 'active') {
        setCallState('active');
        startProgressTimer();
        toast.success('Connected! AMA is ready to talk.');
      }
    } else if (state.status === 'disconnected' && callState === 'active') {
      setCallState('processing');
      handleCallEnd();
    } else if (state.error) {
      setCallState('error');
      toast.error(`Call error: ${state.error}`);
    }
  };

  const startCall = async () => {
    try {
      setCallState('connecting');
      setProgress(0);

      // Create new call manager
      callManagerRef.current = new UltravoxManager(handleCallStateChange);

      // Start the call
      await callManagerRef.current.startCall();

      toast.success('Connecting to AMA...');
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState('error');
      toast.error('Failed to start call. Please try again.');
    }
  };

  const endCall = async () => {
    if (callManagerRef.current) {
      await callManagerRef.current.endCall();
    }
    setCallState('processing');
  };

  const toggleMute = () => {
    if (callManagerRef.current) {
      if (isMuted) {
        callManagerRef.current.unmute();
        setIsMuted(false);
        toast.success('Microphone unmuted');
      } else {
        callManagerRef.current.mute();
        setIsMuted(true);
        toast.success('Microphone muted');
      }
    }
  };

  const handleCallEnd = async () => {
    try {
      if (!callManagerRef.current) return;

      // Get the full transcript
      const transcriptText = callManagerRef.current.getFullTranscript();

      console.log('[VoiceCallModal] Processing call end:', {
        transcriptLength: transcriptText.length,
        userId: userId || 'not authenticated',
      });

      // Analyze the session (works for both authenticated and non-authenticated)
      let track: string;

      if (userId) {
        // User is authenticated - save to Supabase
        const { track: assignedTrack, reason } = await analyzeAndSaveSession(
          transcriptText,
          userId,
          undefined, // callId not needed
          0 // duration not tracked with new SDK
        );
        track = assignedTrack;
        console.log('[VoiceCallModal] Session analyzed:', { track, reason });
      } else {
        // User not authenticated - analyze but save to localStorage
        console.log('[VoiceCallModal] User not authenticated, analyzing locally');

        const ultravoxResponse: UltravoxResponse = {
          sessionId: 'local-session',
          transcript: transcriptText,
          duration: 0,
          metadata: {},
        };

        // Use old generateCareerMap function to get the track
        const result = await generateCareerMap(ultravoxResponse);
        track = result.selectedTrack || 'Game Design'; // Default fallback
      }

      // Generate content for the track
      const contentResponse = await fetch(`/api/generate-content?track=${track}`);
      if (!contentResponse.ok) {
        throw new Error('Failed to generate content');
      }
      const careerData = await contentResponse.json();

      // Save to localStorage for immediate access
      if (typeof window !== 'undefined') {
        localStorage.setItem('ama-call-completed', 'true');
        localStorage.setItem('ama-assigned-track', track);
        localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(careerData));
      }

      setCallState('completed');
      setProgress(100);
      setAssignedTrack(track);

      // Close the voice call modal
      onClose();

      // If user is not authenticated, show sign in modal
      if (!userId) {
        toast.success('Assessment complete! Please sign in to save your progress.');
        setShowAuthModal(true);
      } else {
        // User is authenticated, show confetti immediately
        toast.success('Assessment complete!');
        setShowConfettiModal(true);
      }

    } catch (error) {
      console.error('Error processing call data:', error);
      setCallState('error');
      toast.error('Error processing assessment. Please try again.');
    }
  };

  // Handle successful sign in after assessment
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowConfettiModal(true);
  };

  // Handle confetti modal continue
  const handleConfettiContinue = () => {
    setShowConfettiModal(false);
    onComplete(); // This will redirect to dashboard
  };

  const startProgressTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-call-title"
        aria-describedby="voice-call-description"
      >
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={callState === 'active' || callState === 'processing'}
          aria-label="Close voice call modal"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <h2 id="voice-call-title" className="text-2xl font-bold text-gray-900 mb-2">
            {callState === 'idle' && 'Voice Career Assessment'}
            {callState === 'connecting' && 'Connecting...'}
            {callState === 'active' && 'Tell us about your interests'}
            {callState === 'processing' && 'Analyzing your responses...'}
            {callState === 'completed' && 'Assessment Complete!'}
            {callState === 'error' && 'Connection Error'}
          </h2>

          <p id="voice-call-description" className="text-gray-600 mb-6">
            {callState === 'idle' && 'We\'ll have a brief conversation to understand your career interests and create a personalized learning path.'}
            {callState === 'connecting' && 'Setting up your voice session...'}
            {callState === 'active' && 'Share your interests, skills, and career goals. We\'re listening!'}
            {callState === 'processing' && 'Please wait while we analyze your responses and generate your personalized career path.'}
            {callState === 'completed' && 'Your personalized career path is ready! Redirecting to your dashboard...'}
            {callState === 'error' && 'Sorry, something went wrong. Please try again.'}
          </p>

          {/* Progress Bar */}
          {callState !== 'idle' && (
            <div className="mb-6">
              <div 
                className="w-full bg-gray-200 rounded-full h-2"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${progress}% complete`}
              >
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2" aria-live="polite">
                {progress}% complete
              </p>
            </div>
          )}

          {/* Call Duration */}
          {callState === 'active' && (
            <div className="mb-6">
              <div className="text-3xl font-mono text-gray-900 mb-2">
                {formatDuration(callData.duration)}
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            {callState === 'idle' && (
              <button
                onClick={startCall}
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 flex items-center space-x-2"
                aria-label="Start voice assessment"
              >
                <Phone size={20} />
                <span>Start Assessment</span>
              </button>
            )}

            {callState === 'active' && (
              <>
                <button
                  onClick={toggleMute}
                  className={`px-6 py-3 rounded-full flex items-center space-x-2 ${
                    callData.isMuted 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                  aria-label={callData.isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {callData.isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  <span>{callData.isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                <button
                  onClick={endCall}
                  className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 flex items-center space-x-2"
                  aria-label="End voice assessment"
                >
                  <PhoneOff size={20} />
                  <span>End Call</span>
                </button>
              </>
            )}

            {callState === 'error' && (
              <button
                onClick={startCall}
                className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700"
              >
                Try Again
              </button>
            )}
          </div>

          {/* End Call Instruction */}
          {callState === 'active' && (
            <div className="text-sm text-gray-500 italic">
              End call when you think you are done.
            </div>
          )}

          {/* Transcript Display */}
          {callData.transcripts.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Conversation:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {callData.transcripts
                  .filter((t) => t.isFinal)
                  .map((transcript, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded border-l-2 ${
                        transcript.speaker === 'agent'
                          ? 'bg-primary-50 border-primary-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-xs text-gray-500">
                        {transcript.speaker === 'agent' ? 'AMA: ' : 'You: '}
                      </span>
                      {transcript.text}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Sign In Modal - shown after assessment if user is not authenticated */}
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => {
        setShowAuthModal(false);
        // If user closes without signing in, still show confetti
        setShowConfettiModal(true);
      }}
      initialMode="signin"
    />

    {/* Confetti Celebration Modal - shown after sign in or immediately if authenticated */}
    <ConfettiModal
      isOpen={showConfettiModal}
      onClose={() => setShowConfettiModal(false)}
      track={assignedTrack}
      onContinue={handleConfettiContinue}
    />
    </>
  );
}