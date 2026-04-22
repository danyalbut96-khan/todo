'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '@/lib/types';

interface PomodoroTimerProps {
  isActive: boolean;
  onClose: () => void;
}

export function PomodoroTimer({ isActive, onClose }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  React.useEffect(() => {
    if (!isRunning || !isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Play sound
          if (soundEnabled) {
            const audioContext = new (window.AudioContext ||
              (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
              0.01,
              audioContext.currentTime + 0.5
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
          }

          // Switch between work and break
          setIsBreak(!isBreak);
          return isBreak ? 25 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isActive, isBreak, soundEnabled]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white mb-6 font-bricolage">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h2>

        {/* Timer Circle */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="90"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="90"
              fill="none"
              stroke={isBreak ? '#10b981' : '#6366f1'}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-white font-dm-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <motion.button
            onClick={() => setIsRunning(!isRunning)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
          >
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>
          <motion.button
            onClick={() => {
              setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
              setIsRunning(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </motion.button>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            whileHover={{ scale: 1.1 }}
            className="text-2xl"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </motion.button>
        </div>

        {/* Close */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          className="text-white/60 hover:text-white/80 transition-colors"
        >
          Exit Focus Mode
        </motion.button>
      </div>
    </motion.div>
  );
}
