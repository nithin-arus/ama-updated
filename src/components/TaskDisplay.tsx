'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTrackLock } from '@/hooks/useUltravoxState';

// Dynamically import react-youtube for client-side only
const YouTube = dynamic(() => import('react-youtube'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded" />
});

type Task = {
  id: string;
  type: 'video' | 'article';
  url: string;
  isCompleted: boolean;
  xp: number;
  title: string;
  track?: string;
};

type Props = {
  task: Task;
  onComplete?: (id: string, xp: number) => Promise<void>;
};

export const TaskDisplay: React.FC<Props> = ({ task, onComplete }) => {
  const [iframeFailed, setIframeFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { syncCareerProgress } = useTrackLock();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMarkComplete = async () => {
    if (task.isCompleted || loading) return;
    
    setLoading(true);
    
    try {
      // Call external completion handler if provided
      if (onComplete) {
        await onComplete(task.id, task.xp);
      }

      // Sync progress to Supabase if syncCareerProgress is available
      if (syncCareerProgress && task.track) {
        const currentData = JSON.parse(
          localStorage.getItem(`ama-career-data-${task.track}`) || '{}'
        );
        
        const updatedTasks = currentData.tasks || [];
        const taskIndex = updatedTasks.findIndex((t: Task) => t.id === task.id);
        
        if (taskIndex >= 0) {
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], isCompleted: true };
        } else {
          updatedTasks.push({ ...task, isCompleted: true });
        }

        const updatedData = {
          ...currentData,
          tasks: updatedTasks,
          totalXP: (currentData.totalXP || 0) + task.xp,
          completedTasks: (currentData.completedTasks || 0) + 1,
        };

        await syncCareerProgress(task.track, updatedData);
      }

      // Update localStorage for immediate UI feedback
      const taskKey = `ama-task-${task.id}`;
      localStorage.setItem(taskKey, JSON.stringify({ ...task, isCompleted: true }));
      
    } catch (error) {
      console.error('Error marking task as complete:', error);
    } finally {
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    window.open(task.url, '_blank', 'noopener,noreferrer');
  };

  const extractVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  if (!mounted) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-32 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded w-24 mt-4"></div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{task.title}</h3>
      
      {task.type === 'video' && (
        <div className="mb-4">
          <YouTube
            videoId={extractVideoId(task.url)}
            opts={{
              width: '100%',
              height: '390',
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onError={(error) => {
              console.error('YouTube player error:', error);
            }}
          />
        </div>
      )}
      
      {task.type === 'article' && (
        <div className="mb-4">
          {!iframeFailed ? (
            <iframe
              src={task.url}
              width="100%"
              height="500"
              onError={() => setIframeFailed(true)}
              onLoad={() => {
                // Check if iframe loaded successfully
                try {
                  const iframe = document.querySelector('iframe[src="' + task.url + '"]') as HTMLIFrameElement;
                  if (iframe && iframe.contentDocument === null) {
                    setIframeFailed(true);
                  }
                } catch (e) {
                  setIframeFailed(true);
                }
              }}
              title={task.title}
              className="border rounded"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-600 mb-4">
                Unable to display article in iframe. Click below to open in a new tab.
              </p>
              <button
                onClick={openInNewTab}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Open Article in New Tab
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {task.isCompleted ? (
            <span className="text-green-600 font-medium">✓ Completed</span>
          ) : (
            <span>XP: {task.xp}</span>
          )}
        </div>
        
        <button
          disabled={task.isCompleted || loading}
          onClick={handleMarkComplete}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            task.isCompleted
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : loading
              ? 'bg-blue-300 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {task.isCompleted 
            ? 'Completed' 
            : loading 
            ? 'Marking...' 
            : 'Mark as Complete'
          }
        </button>
      </div>
    </div>
  );
};
