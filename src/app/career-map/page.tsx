'use client';

import { useState, useEffect } from 'react';
import { Gamepad2, Palette, Video, Monitor, Lock, ArrowRight } from 'lucide-react';
import { useTrackLock } from '@/hooks/useUltravoxState';
import { TrackType } from '@/types';

const initialTracks = [
  {
    id: 'Game Design' as TrackType,
    title: 'Game Design',
    description: 'Create engaging gameplay experiences and interactive worlds',
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    skills: ['Game Mechanics', 'Level Design', 'User Experience', 'Prototyping'],
    careerPaths: ['Game Designer', 'Level Designer', 'Game Producer', 'UX Designer'],
    averageSalary: '$85,000',
  },
  {
    id: 'Game Asset Artist' as TrackType,
    title: 'Game Asset Artist',
    description: 'Create visual assets and artistic content for games',
    icon: <Palette className="w-8 h-8" />,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    skills: ['Digital Art', '3D Modeling', 'Animation', 'Visual Design'],
    careerPaths: ['Game Artist', '3D Modeler', 'Animator', 'Concept Artist'],
    averageSalary: '$75,000',
  },
  {
    id: 'Content Creation' as TrackType,
    title: 'Content Creation',
    description: 'Build audiences and create engaging content across platforms',
    icon: <Video className="w-8 h-8" />,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    skills: ['Video Production', 'Social Media', 'Storytelling', 'Community Building'],
    careerPaths: ['Content Creator', 'Social Media Manager', 'Video Producer', 'Influencer'],
    averageSalary: '$65,000',
  },
];

export default function CareerMapPage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackType | null>(null);
  const { isLocked, assignedTrack, mounted } = useTrackLock();

  useEffect(() => {
    if (mounted && assignedTrack) {
      setSelectedTrack(assignedTrack as TrackType);
    }
  }, [mounted, assignedTrack]);

  // Show loader until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  const handleTrackSelect = (trackId: TrackType) => {
    if (!isLocked) {
      setSelectedTrack(trackId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Career Path
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore different career tracks and find the one that matches your interests and goals.
          {isLocked && (
            <span className="block mt-2 text-orange-600 font-medium">
              🔒 Your track is locked after completing the onboarding assessment.
            </span>
          )}
        </p>
      </div>

      {/* Track Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {initialTracks.map((track) => {
          const isSelected = selectedTrack === track.id;
          const isDisabled = isLocked && assignedTrack !== track.id;
          
          return (
            <div
              key={track.id}
              onClick={() => handleTrackSelect(track.id)}
              className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                isDisabled ? 'cursor-not-allowed opacity-60' : ''
              }`}
              title={isDisabled ? 'Track is locked after onboarding' : ''}
            >
              <div className={`p-8 rounded-xl border-2 transition-colors ${
                isSelected 
                  ? `${track.borderColor} ${track.lightColor}` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } ${isDisabled ? 'hover:border-gray-200' : ''}`}>
                
                {/* Lock Icon for Disabled Tracks */}
                {isDisabled && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Track Icon */}
                <div className={`w-16 h-16 ${track.color} rounded-lg flex items-center justify-center text-white mb-6 mx-auto`}>
                  {track.icon}
                </div>

                {/* Track Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {track.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {track.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Average Salary: <span className="font-semibold text-gray-700">{track.averageSalary}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Paths */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Career Paths</h4>
                  <ul className="space-y-1">
                    {track.careerPaths.map((path) => (
                      <li key={path} className="text-gray-600 text-sm flex items-center">
                        <ArrowRight className="w-3 h-3 mr-2 text-gray-400" />
                        {path}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-6 text-center">
                    <div className={`inline-flex items-center px-4 py-2 ${track.color} text-white rounded-lg font-medium`}>
                      ✓ Selected Track
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Details */}
      {selectedTrack && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your {initialTracks.find(t => t.id === selectedTrack)?.title} Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isLocked 
                ? 'This is your assigned career track based on your assessment. Start learning and building your skills!'
                : 'This track looks great! Complete your voice assessment to unlock your personalized learning path.'
              }
            </p>
          </div>

          {/* Learning Path Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Foundations</h3>
              <p className="text-gray-600 text-sm">
                Learn the fundamentals and core concepts
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Practice</h3>
              <p className="text-gray-600 text-sm">
                Apply your skills through hands-on projects
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Master</h3>
              <p className="text-gray-600 text-sm">
                Build a portfolio and advance your career
              </p>
            </div>
          </div>

          {!isLocked && (
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Ready to start your journey? Take our voice assessment to unlock your personalized learning path.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center"
              >
                Start Assessment
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          )}

          {isLocked && (
            <div className="text-center mt-8">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
