'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Todo, Tag } from '@/lib/types';
import { format, isToday, isBefore, startOfToday } from 'date-fns';

interface TaskCardProps {
  todo: Todo;
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
  onClick?: () => void;
  isSelected?: boolean;
}

export function TaskCard({
  todo,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onClick,
  isSelected = false,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [showSubtasks, setShowSubtasks] = React.useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, { text: editText });
      setIsEditing(false);
    }
  };

  const isOverdue =
    todo.dueDate && isBefore(new Date(todo.dueDate), startOfToday());
  const isDueToday = todo.dueDate && isToday(new Date(todo.dueDate));

  const completedSubtasks = todo.subtasks.filter((s) => s.completed).length;
  const subtaskProgress =
    todo.subtasks.length > 0
      ? Math.round((completedSubtasks / todo.subtasks.length) * 100)
      : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 border-l-2 border-red-500';
      case 'medium':
        return 'bg-amber-500/20 border-l-2 border-amber-500';
      case 'low':
        return 'bg-emerald-500/20 border-l-2 border-emerald-500';
      default:
        return 'bg-white/5 border-l-2 border-white/20';
    }
  };

  const borderColor = isOverdue
    ? 'border-l-2 border-red-500'
    : isDueToday
      ? 'border-l-2 border-amber-500'
      : getPriorityColor(todo.priority);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onClick={onClick}
      className={`p-4 rounded-lg border border-white/8 backdrop-blur-xl transition-all duration-200 cursor-pointer group ${
        isSelected
          ? 'bg-indigo-600/30 border-indigo-500/50'
          : 'bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/15'
      } ${borderColor}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo.id);
          }}
          whileTap={{ scale: 0.9 }}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${
            todo.completed
              ? 'bg-indigo-600 border-indigo-500'
              : 'border-white/30 hover:border-indigo-400'
          }`}
        >
          {todo.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-white"
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
              onClick={(e) => e.stopPropagation()}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <>
              <p
                className={`font-mono transition-all duration-200 ${
                  todo.completed
                    ? 'line-through text-white/40'
                    : 'text-white/80'
                }`}
              >
                {todo.text}
              </p>

              {/* Subtasks Progress */}
              {todo.subtasks.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-white/10 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subtaskProgress}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                  <span className="text-xs text-white/50">
                    {completedSubtasks}/{todo.subtasks.length}
                  </span>
                </div>
              )}

              {/* Tags */}
              {todo.tagIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {todo.tagIds.map((tagId) => {
                    const tag = tags.find((t) => t.id === tagId);
                    if (!tag) return null;
                    return (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: tag.color + '30',
                          color: tag.color,
                        }}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Due Date & Status */}
              <div className="mt-2 flex items-center gap-2 text-xs">
                {isOverdue && (
                  <span className="px-2 py-0.5 rounded bg-red-500/30 text-red-300">
                    Overdue
                  </span>
                )}
                {isDueToday && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-300">
                    Due Today
                  </span>
                )}
                {todo.dueDate && !isOverdue && !isDueToday && (
                  <span className="text-white/50">
                    {format(new Date(todo.dueDate), 'MMM d')}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 text-indigo-400 hover:bg-indigo-500/20 rounded transition-colors"
              >
                ✎
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"
              >
                🗑️
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
