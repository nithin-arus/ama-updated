'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Star, BookOpen, Clock, ArrowRight, Lock } from 'lucide-react';
import { useDashboardUnlock } from '@/hooks/useUltravoxState';
import { loadCareerData, getAssignedTrack } from '@/utils/api';
import { CareerData, Level, Task } from '@/types';
import { DashboardDebug } from '@/components/DashboardDebug';

export default function DashboardPage() {
  const [careerData, setCareerData] = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { unlocked: isDashboardUnlocked, mounted } = useDashboardUnlock();
  const router = useRouter();
  const redirectGuard = useRef(false);

  useEffect(() => {
    console.log(`Dashboard redirect check: mounted=${mounted}, isDashboardUnlocked=${isDashboardUnlocked}, redirectGuard=${redirectGuard.current}`);
    
    // Debug localStorage values
    const callCompleted = localStorage.getItem('ama-call-completed');
    const assignedTrack = localStorage.getItem('ama-assigned-track');
    console.log('LocalStorage debug:', { callCompleted, assignedTrack });
    
    // Only redirect after component is mounted and unlock state is computed
    if (mounted && !isDashboardUnlocked && !redirectGuard.current) {
      console.log('Redirecting from dashboard to home...');
      redirectGuard.current = true;
      router.push('/');
      return;
    }

    if (mounted && isDashboardUnlocked) {
      console.log('Dashboard unlocked, loading career data...');
      const loadData = async () => {
        try {
          const track = getAssignedTrack();
          console.log('Assigned track:', track);
          if (track) {
            const data = loadCareerData(track);
            console.log('Loaded career data:', data);
            setCareerData(data);
          } else {
            console.log('No assigned track found');
          }
        } catch (error) {
          console.error('Error loading career data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [mounted, isDashboardUnlocked, router]);

  const completeTask = (taskId: string) => {
    if (!careerData) return;

    const updatedData = { ...careerData };
    let taskFound = false;

    // Find and toggle the task completion status
    updatedData.levels.forEach(level => {
      level.tasks.forEach(task => {
        if (task.id === taskId) {
          // Toggle completion status
          task.isCompleted = !task.isCompleted;

          // Add or subtract XP based on new completion status
          if (task.isCompleted) {
            updatedData.currentXP += task.xp;
          } else {
            updatedData.currentXP -= task.xp;
          }

          taskFound = true;
        }
      });
    });

    if (taskFound) {
      // Recalculate level completion and unlocks
      updatedData.levels.forEach((level, index) => {
        const allTasksCompleted = level.tasks.every(task => task.isCompleted);

        // Update level completion status
        level.isCompleted = allTasksCompleted;

        // Unlock next level if current level is completed
        if (allTasksCompleted && index + 1 < updatedData.levels.length) {
          updatedData.levels[index + 1].isUnlocked = true;
        }

        // Lock next level if current level is no longer completed
        if (!allTasksCompleted && index + 1 < updatedData.levels.length) {
          // Only lock if no tasks in next level are completed
          const nextLevel = updatedData.levels[index + 1];
          const hasCompletedTasksInNextLevel = nextLevel.tasks.some(t => t.isCompleted);
          if (!hasCompletedTasksInNextLevel && index > 0) {
            // Keep level 2 unlocked if level 1 exists, otherwise maintain unlock
            nextLevel.isUnlocked = index === 0;
          }
        }
      });

      // Update current level
      const currentLevel = updatedData.levels.find(level =>
        updatedData.currentXP >= level.xpRequired && !level.isCompleted
      );
      if (currentLevel) {
        updatedData.currentLevel = currentLevel.id;
      }

      setCareerData(updatedData);

      // Save to localStorage and Supabase
      const track = getAssignedTrack();
      if (track) {
        localStorage.setItem(`ama-career-data-${track}`, JSON.stringify(updatedData));
        // TODO: Also save to Supabase
      }
    }
  };

  // Show loader until mounted
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show redirecting message if not unlocked (will redirect)
  if (mounted && !isDashboardUnlocked) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to assessment...</p>
        </div>
      </div>
    );
  }

  // Show loading while fetching career data
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Career Data Found</h1>
          <p className="text-gray-600 mb-6">Something went wrong loading your career data.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = (careerData.currentXP / careerData.totalXP) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DashboardDebug />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your {careerData.targetRole} Journey
        </h1>
        <p className="text-gray-600">
          Track your progress and continue building skills for your dream career.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-2xl font-bold text-gray-900">{careerData.currentXP}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-gray-900">{careerData.currentLevel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {careerData.levels.reduce((acc, level) => 
                  acc + level.tasks.filter(task => task.isCompleted).length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
          <span className="text-sm text-gray-600">{careerData.currentXP} / {careerData.totalXP} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Learning Path</h2>
        
        {careerData.levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onCompleteTask={completeTask}
          />
        ))}
      </div>
    </div>
  );
}

interface LevelCardProps {
  level: Level;
  onCompleteTask: (taskId: string) => void;
}

function LevelCard({ level, onCompleteTask }: LevelCardProps) {
  const completedTasks = level.tasks.filter(task => task.isCompleted).length;
  const totalTasks = level.tasks.length;

  // Calculate XP-based progress for this level
  const earnedXP = level.tasks
    .filter(task => task.isCompleted)
    .reduce((sum, task) => sum + task.xp, 0);
  const totalXP = level.tasks.reduce((sum, task) => sum + task.xp, 0);
  const progressPercentage = totalXP > 0 ? (earnedXP / totalXP) * 100 : 0;

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
      level.isUnlocked ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
            level.isCompleted ? 'bg-green-500' : level.isUnlocked ? 'bg-primary-600' : 'bg-gray-400'
          }`}>
            {level.isCompleted ? '✓' : level.id}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{level.title}</h3>
            <p className="text-sm text-gray-600">{level.xpRequired} XP required</p>
          </div>
        </div>
        
        {!level.isUnlocked && (
          <Lock className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {level.isUnlocked && (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{earnedXP} / {totalXP} XP ({completedTasks} / {totalTasks} tasks)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {level.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => onCompleteTask(task.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
}

function TaskCard({ task, onComplete }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'article':
        return '📖';
      case 'project':
        return '🛠️';
      default:
        return '📝';
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^?&\s]+)/,
      /youtube\.com\/v\/([^?&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const youtubeVideos = task.resources
    .map(url => ({ url, id: extractYouTubeId(url) }))
    .filter(video => video.id !== null);

  const otherResources = task.resources.filter(url => !extractYouTubeId(url));

  return (
    <div className={`p-4 rounded-lg border-2 transition-colors ${
      task.isCompleted
        ? 'border-green-200 bg-green-50'
        : 'border-gray-200 bg-white hover:border-primary-200'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start flex-1">
          <span className="text-2xl mr-3">{getTaskIcon(task.type)}</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">{task.xp} XP</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {task.resources.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium whitespace-nowrap"
            >
              {expanded ? 'Hide Resources' : 'View Resources'}
            </button>
          )}
          <button
            onClick={onComplete}
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap font-medium transition-colors ${
              task.isCompleted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {task.isCompleted ? (
              <>
                ✓ Completed
                <ArrowRight className="ml-1 rotate-180" size={16} />
              </>
            ) : (
              <>
                Mark Complete
                <ArrowRight className="ml-1" size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && task.resources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-semibold text-gray-900 mb-3">Resources:</h5>

          {/* YouTube Videos */}
          {youtubeVideos.length > 0 && (
            <div className="space-y-3 mb-4">
              {youtubeVideos.map((video, idx) => (
                <div key={idx} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={`Video ${idx + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}

          {/* Other Resources */}
          {otherResources.length > 0 && (
            <div className="space-y-2">
              {otherResources.map((url, idx) => {
                const displayUrl = url.length > 60 ? url.substring(0, 57) + '...' : url;
                return (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    <span className="mr-2">🔗</span>
                    <span>{displayUrl}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
