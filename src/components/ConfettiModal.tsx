'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface ConfettiModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: string;
  onContinue: () => void;
}

export default function ConfettiModal({ isOpen, onClose, track, onContinue }: ConfettiModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Stop confetti after 4 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Get track emoji based on track name
  const getTrackEmoji = (trackName: string) => {
    if (trackName.toLowerCase().includes('game design')) return '🎮';
    if (trackName.toLowerCase().includes('artist')) return '🎨';
    if (trackName.toLowerCase().includes('content')) return '🎥';
    return '🎯';
  };

  // Get track color based on track name
  const getTrackColor = (trackName: string) => {
    if (trackName.toLowerCase().includes('game design')) return 'from-blue-500 to-purple-600';
    if (trackName.toLowerCase().includes('artist')) return 'from-pink-500 to-orange-600';
    if (trackName.toLowerCase().includes('content')) return 'from-green-500 to-teal-600';
    return 'from-primary-500 to-primary-700';
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confetti-modal-title"
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  '#ff0000', '#00ff00', '#0000ff', '#ffff00',
                  '#ff00ff', '#00ffff', '#ffa500', '#ff1493'
                ][Math.floor(Math.random() * 8)],
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close celebration modal"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          {/* Animated Icon */}
          <div className="mb-6 relative">
            <div className="inline-block relative animate-bounce">
              <div className={`absolute inset-0 bg-gradient-to-br ${getTrackColor(track)} rounded-full blur-xl opacity-50`}></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg">
                <span className="text-7xl">{getTrackEmoji(track)}</span>
              </div>
            </div>
            <Sparkles
              className="absolute -top-2 -right-2 text-yellow-400 animate-pulse"
              size={32}
            />
          </div>

          {/* Title */}
          <h2
            id="confetti-modal-title"
            className="text-3xl font-bold text-gray-900 mb-3"
          >
            Congratulations! 🎉
          </h2>

          {/* Track Announcement */}
          <div className="mb-6">
            <p className="text-gray-600 mb-2">You've been matched with:</p>
            <div className={`inline-block bg-gradient-to-r ${getTrackColor(track)} text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg`}>
              {track}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            Your personalized learning journey is ready! Start exploring your curriculum and building your skills.
          </p>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className={`w-full bg-gradient-to-r ${getTrackColor(track)} text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            Start My Journey
          </button>
        </div>
      </div>

      {/* Confetti CSS */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall linear infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
