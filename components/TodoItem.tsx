'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '@/lib/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 border-red-500/50 text-red-300';
      case 'medium':
        return 'bg-amber-500/20 border-amber-500/50 text-amber-300';
      case 'low':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
    }
  };

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '◯';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/8 rounded-lg group hover:border-white/15 transition-all duration-200 backdrop-blur-xl"
    >
      {/* Checkbox */}
      <motion.button
        onClick={() => onToggle(todo.id)}
        whileTap={{ scale: 0.9 }}
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-indigo-600 border-indigo-500'
            : 'border-white/30 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <p
            className={`font-mono transition-all duration-200 ${
              todo.completed
                ? 'line-through text-white/40'
                : 'text-white/80'
            }`}
          >
            {todo.text}
          </p>
        )}
      </div>

      {/* Priority Badge */}
      {!isEditing && (
        <span
          className={`px-2 py-1 text-xs rounded border ${getPriorityColor(
            todo.priority
          )}`}
        >
          {getPriorityEmoji(todo.priority)}
        </span>
      )}

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded transition-colors"
              title="Save"
            >
              ✓
            </motion.button>
            <motion.button
              onClick={handleCancel}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
              title="Cancel"
            >
              ✕
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              onClick={() => setIsEditing(true)}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded transition-colors"
              title="Edit"
            >
              ✎
            </motion.button>
            <motion.button
              onClick={() => onDelete(todo.id)}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
              title="Delete"
            >
              🗑️
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
