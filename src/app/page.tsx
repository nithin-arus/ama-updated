'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Target, BookOpen, Users, ArrowRight } from 'lucide-react';
import { useDashboardUnlock } from '@/hooks/useUltravoxState';
import VoiceCallModal from '@/components/VoiceCallModal';
import Link from 'next/link';

export default function HomePage() {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const { unlocked: isDashboardUnlocked, mounted } = useDashboardUnlock();
  const router = useRouter();

  const handleVoiceCallComplete = () => {
    router.push('/dashboard');
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
            <button
              onClick={() => setShowVoiceModal(true)}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center transition-colors"
            >
              <Mic className="mr-3" size={24} />
              Start Your Assessment
              <ArrowRight className="ml-3" size={20} />
            </button>
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
    </>
  );
}
