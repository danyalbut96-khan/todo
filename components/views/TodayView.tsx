'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Todo, Tag } from '@/lib/types';
import { TaskCard } from '@/components/task/TaskCard';

const QUOTES = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Success is not final, failure is not fatal. - Winston Churchill',
  'Believe you can and you\'re halfway there. - Theodore Roosevelt',
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
  'It is during our darkest moments that we must focus to see the light. - Aristotle',
  'The only impossible journey is the one you never begin. - Tony Robbins',
  'In the middle of difficulty lies opportunity. - Albert Einstein',
  'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
  'The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb',
  'Your limitation—it\'s only your imagination. - Unknown',
];

interface TodayViewProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
  onSelectTodo: (todo: Todo) => void;
  selectedTodoId?: string | null;
}

export function TodayView({
  todos,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onSelectTodo,
  selectedTodoId,
}: TodayViewProps) {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const completed = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg text-center"
      >
        <p className="text-white/80 italic font-bricolage text-lg">{quote}</p>
      </motion.div>

      {/* Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100) }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white font-dm-mono">
              {progress}%
            </div>
            <div className="text-xs text-white/60">
              {completed}/{todos.length}
            </div>
          </div>
        </div>
        <p className="text-white/70 text-center">
          You've completed <span className="font-semibold text-indigo-400">{completed}</span> of{' '}
          <span className="font-semibold text-indigo-400">{todos.length}</span> tasks today
        </p>
      </motion.div>

      {/* Tasks */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-white/60 font-mono">All done for today!</p>
          </motion.div>
        ) : (
          todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TaskCard
                todo={todo}
                tags={tags}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onClick={() => onSelectTodo(todo)}
                isSelected={selectedTodoId === todo.id}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
