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
          Career Paths
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the different career tracks available in the game industry.
          {assignedTrack && (
            <span className="block mt-2 text-primary-600 font-medium">
              Your assigned track: {assignedTrack}
            </span>
          )}
        </p>
      </div>

      {/* Track Cards - Read-only display */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {initialTracks.map((track) => {
          const isAssigned = assignedTrack === track.id;

          return (
            <div
              key={track.id}
              className="relative"
              aria-disabled="true"
            >
              <div className={`p-8 rounded-xl border-2 transition-all ${
                isAssigned
                  ? `${track.borderColor} ${track.lightColor} ring-2 ring-offset-2 ${track.borderColor.replace('border', 'ring')}`
                  : 'border-gray-200 bg-white'
              }`}>

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

                {/* Assigned Indicator */}
                {isAssigned && (
                  <div className="mt-6 text-center">
                    <div className={`inline-flex items-center px-4 py-2 ${track.color} text-white rounded-lg font-medium`}>
                      ✓ Your Track
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6 text-lg">
          Want to discover which career track is right for you?
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center text-lg font-semibold shadow-lg"
        >
          Talk to the AI Assistant
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}
