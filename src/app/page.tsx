'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Target, BookOpen, Users, ArrowRight, X } from 'lucide-react';
import { useDashboardUnlock } from '@/hooks/useUltravoxState';
import VoiceCallModal from '@/components/VoiceCallModal';
import Link from 'next/link';

export default function HomePage() {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showTrackSelector, setShowTrackSelector] = useState(false);
  const { unlocked: isDashboardUnlocked, mounted } = useDashboardUnlock();
  const router = useRouter();

  const handleVoiceCallComplete = () => {
    router.push('/dashboard');
  };

  const handleTrackSelection = async (track: 'Game Design' | 'Game Asset Artist' | 'Content Creation') => {
    // TEMPORARY BYPASS - This will be removed when Ultravox API key is fixed
    if (typeof window !== 'undefined') {
      try {
        console.log('[Bypass] Starting track selection:', track);

        // Fetch the full career data for the selected track
        const response = await fetch(`/api/generate-content?track=${encodeURIComponent(track)}`);
        if (!response.ok) {
          throw new Error('Failed to load track data');
        }
        const careerData = await response.json();
        console.log('[Bypass] Received career data:', careerData);

        // Set all the required localStorage keys (using hyphens, not underscores)
        localStorage.setItem('ama-call-completed', 'true');
        localStorage.setItem('ama-assigned-track', track);
        localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(careerData));

        console.log('[Bypass] LocalStorage set:', {
          'ama-call-completed': localStorage.getItem('ama-call-completed'),
          'ama-assigned-track': localStorage.getItem('ama-assigned-track'),
          hasCareerData: !!localStorage.getItem(`ama-career-data-${track}`)
        });

        // Close the modal
        setShowTrackSelector(false);

        // Small delay to ensure localStorage is written
        await new Promise(resolve => setTimeout(resolve, 100));

        // Force a hard navigation to ensure fresh state
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('[Bypass] Error loading track:', error);
        alert('Failed to load track data. Please try again.');
      }
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your
            <span className="text-primary-600"> Dream Career</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {isDashboardUnlocked
              ? "Welcome back! You can continue your journey or explore our features."
              : "Take our AI-powered voice assessment to unlock your personalized career path. From game design to content creation, we'll help you find your perfect fit."}
          </p>
          
          {isDashboardUnlocked ? (
            <Link
              href="/dashboard"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center transition-colors"
            >
              Go to Your Dashboard
              <ArrowRight className="ml-3" size={20} />
            </Link>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => setShowVoiceModal(true)}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center transition-colors"
              >
                <Mic className="mr-3" size={24} />
                Start Your Assessment
                <ArrowRight className="ml-3" size={20} />
              </button>

              {/* Temporary Bypass Button */}
              <button
                onClick={() => setShowTrackSelector(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
              >
                Skip Assessment (Testing Mode)
              </button>
            </div>
          )}
          
          {!isDashboardUnlocked && (
            <p className="text-sm text-gray-500 mt-4">
              ✨ Takes just 2-3 minutes • Completely personalized • Free forever
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4"><Mic className="w-8 h-8 text-primary-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Assessment</h3>
            <p className="text-gray-600">Share your interests through natural conversation</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4"><Target className="w-8 h-8 text-primary-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Path</h3>
            <p className="text-gray-600">Get a custom career roadmap based on your goals</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4"><BookOpen className="w-8 h-8 text-primary-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Structured Learning</h3>
            <p className="text-gray-600">Progress through levels with hands-on projects</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4"><Users className="w-8 h-8 text-primary-600" /></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
            <p className="text-gray-600">Learn from industry professionals and mentors</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Assessment</h3>
              <p className="text-gray-600">Tell us about your interests, skills, and career goals in a natural conversation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your responses to match you with the perfect career track</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Learning</h3>
              <p className="text-gray-600">Follow your personalized roadmap with projects, lessons, and milestones</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Find Your Path?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners who have discovered their dream careers
          </p>
          <button
            onClick={() => setShowVoiceModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>

      <VoiceCallModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onComplete={handleVoiceCallComplete}
      />

      {/* Track Selector Modal - Temporary Bypass */}
      {showTrackSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Select Your Career Track</h2>
              <button
                onClick={() => setShowTrackSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Choose a track to test the curriculum. This is temporary - voice assessment will be re-enabled once the API key is updated.
            </p>

            <div className="space-y-4">
              {/* Game Design Track */}
              <button
                onClick={() => handleTrackSelection('Game Design')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">🎮 Game Design & Development</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Learn game development, mechanics, and publishing. Build complete games from concept to release.
                </p>
                <p className="text-primary-600 font-semibold">4,100 XP • 5 Levels • 45 Tasks</p>
              </button>

              {/* Game Asset Artist Track */}
              <button
                onClick={() => handleTrackSelection('Game Asset Artist')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">🎨 Game Asset Artist (3D & Environment)</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Master 3D modeling, texturing, and asset creation. Build professional portfolio with Blender and Unreal Engine.
                </p>
                <p className="text-primary-600 font-semibold">3,050 XP • 5 Levels • 45 Tasks</p>
              </button>

              {/* Content Creation Track */}
              <button
                onClick={() => handleTrackSelection('Content Creation')}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">🎥 Content Creation (Streaming & Community)</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Learn YouTube, Twitch streaming, video editing, and monetization. Build engaged communities and revenue streams.
                </p>
                <p className="text-primary-600 font-semibold">3,600 XP • 5 Levels • 45 Tasks</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
