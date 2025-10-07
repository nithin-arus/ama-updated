'use client';

import { useState, useEffect } from 'react';

export function DashboardDebug() {
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check localStorage values
    const callCompleted = localStorage.getItem('ama-call-completed');
    const assignedTrack = localStorage.getItem('ama-assigned-track');
    const careerData = localStorage.getItem('ama-career-data-gameDesign');
    
    setLocalStorageData({
      callCompleted,
      assignedTrack,
      careerData: careerData ? JSON.parse(careerData) : null,
    });

    setIsUnlocked(!!(callCompleted === 'true' || assignedTrack));
  }, []);

  const setMockData = () => {
    localStorage.setItem('ama-call-completed', 'true');
    localStorage.setItem('ama-assigned-track', 'gameDesign');
    
    // Set mock career data
    const mockCareerData = {
      targetRole: 'Game Designer',
      selectedTrack: 'gameDesign',
      totalXP: 1000,
      currentXP: 0,
      currentLevel: 1,
      levels: [
        {
          id: 1,
          title: 'Game Design Fundamentals',
          xpRequired: 100,
          isUnlocked: true,
          isCompleted: false,
          tasks: [
            {
              id: 'gd_1_1',
              title: 'Introduction to Game Design',
              xp: 25,
              isCompleted: false,
              type: 'video',
              description: 'Learn the basics of game design',
              resources: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
            },
            {
              id: 'gd_1_2',
              title: 'Game Design Principles',
              xp: 25,
              isCompleted: false,
              type: 'article',
              description: 'Understanding core game design principles',
              resources: ['https://example.com/article1'],
            },
          ],
        },
      ],
    };
    
    localStorage.setItem('ama-career-data-gameDesign', JSON.stringify(mockCareerData));
    
    // Refresh the page to see changes
    window.location.reload();
  };

  const clearData = () => {
    localStorage.removeItem('ama-call-completed');
    localStorage.removeItem('ama-assigned-track');
    localStorage.removeItem('ama-career-data-gameDesign');
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <h3 className="text-lg font-semibold mb-3">Dashboard Debug</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Call Completed:</strong> {localStorageData.callCompleted || 'null'}
        </div>
        <div>
          <strong>Assigned Track:</strong> {localStorageData.assignedTrack || 'null'}
        </div>
        <div>
          <strong>Is Unlocked:</strong> {isUnlocked ? '✅ Yes' : '❌ No'}
        </div>
        <div>
          <strong>Career Data:</strong> {localStorageData.careerData ? '✅ Present' : '❌ Missing'}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={setMockData}
          className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
        >
          Set Mock Data
        </button>
        <button
          onClick={clearData}
          className="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}
