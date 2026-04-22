'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TodoInputProps {
  onAdd: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    onAdd(text, priority);
    setText('');
    setPriority('medium');
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-amber-400';
      case 'low':
        return 'text-emerald-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <motion.div
        animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-2"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/8 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-xl"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={`px-3 py-3 rounded-lg transition-all duration-200 ${
              priority === 'low'
                ? 'bg-emerald-500/30 border border-emerald-500/50 text-emerald-400'
                : 'bg-white/5 border border-white/10 text-emerald-400/60 hover:bg-white/10'
            }`}
            title="Low Priority"
          >
            🟢
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={`px-3 py-3 rounded-lg transition-all duration-200 ${
              priority === 'medium'
                ? 'bg-amber-500/30 border border-amber-500/50 text-amber-400'
                : 'bg-white/5 border border-white/10 text-amber-400/60 hover:bg-white/10'
            }`}
            title="Medium Priority"
          >
            🟡
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={`px-3 py-3 rounded-lg transition-all duration-200 ${
              priority === 'high'
                ? 'bg-red-500/30 border border-red-500/50 text-red-400'
                : 'bg-white/5 border border-white/10 text-red-400/60 hover:bg-white/10'
            }`}
            title="High Priority"
          >
            🔴
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Add
        </button>
      </motion.div>
    </form>
  );
}
