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

    // Find and complete the task
    updatedData.levels.forEach(level => {
      level.tasks.forEach(task => {
        if (task.id === taskId && !task.isCompleted) {
          task.isCompleted = true;
          updatedData.currentXP += task.xp;
          taskFound = true;
        }
      });
    });

    if (taskFound) {
      // Check for level completion and unlocks
      updatedData.levels.forEach((level, index) => {
        const allTasksCompleted = level.tasks.every(task => task.isCompleted);
        if (allTasksCompleted && !level.isCompleted) {
          level.isCompleted = true;
          
          // Unlock next level
          if (index + 1 < updatedData.levels.length) {
            updatedData.levels[index + 1].isUnlocked = true;
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
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
              <span>{completedTasks} / {totalTasks} tasks</span>
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

  return (
    <div className={`p-4 rounded-lg border-2 transition-colors ${
      task.isCompleted 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200 bg-white hover:border-primary-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <span className="text-2xl mr-3">{getTaskIcon(task.type)}</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500 mt-1">{task.xp} XP</p>
          </div>
        </div>
        
        {task.isCompleted ? (
          <div className="text-green-600 font-medium">✓ Complete</div>
        ) : (
          <button
            onClick={onComplete}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center"
          >
            Complete
            <ArrowRight className="ml-1" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
