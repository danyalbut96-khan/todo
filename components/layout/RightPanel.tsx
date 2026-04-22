'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo, Tag } from '@/lib/types';
import { format } from 'date-fns';

interface RightPanelProps {
  todo: Todo | null;
  tags: Tag[];
  onClose: () => void;
  onUpdate: (updates: Partial<Todo>) => void;
  onAddSubtask: (text: string) => void;
  onToggleSubtask: (subtaskId: string) => void;
  onDeleteSubtask: (subtaskId: string) => void;
  onAddTag: (tagId: string) => void;
  onRemoveTag: (tagId: string) => void;
  isOpen?: boolean;
}

export function RightPanel({
  todo,
  tags,
  onClose,
  onUpdate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onAddTag,
  onRemoveTag,
  isOpen = !!todo,
}: RightPanelProps) {
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(todo?.text || '');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editDescription, setEditDescription] = useState(todo?.description || '');

  if (!todo) return null;

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      onUpdate({ text: editTitle });
      setIsEditingTitle(false);
    }
  };

  const handleSaveDescription = () => {
    onUpdate({ description: editDescription });
    setIsEditingDescription(false);
  };

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      onAddSubtask(newSubtaskText);
      setNewSubtaskText('');
    }
  };

  const completedSubtasks = todo.subtasks.filter((s) => s.completed).length;
  const subtaskProgress =
    todo.subtasks.length > 0
      ? Math.round((completedSubtasks / todo.subtasks.length) * 100)
      : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed md:relative right-0 top-0 md:top-auto w-full md:w-80 h-screen md:h-auto bg-gradient-to-b from-white/5 to-white/[0.02] border-l border-white/10 backdrop-blur-xl overflow-y-auto z-40"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02]">
              <h2 className="text-sm font-semibold text-white">Task Details</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Title
                </label>
                {isEditingTitle ? (
                  <input
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleSaveTitle}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle();
                      if (e.key === 'Escape') setIsEditingTitle(false);
                    }}
                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p
                    onClick={() => setIsEditingTitle(true)}
                    className="mt-1 p-2 rounded cursor-pointer hover:bg-white/5 text-white break-words"
                  >
                    {todo.text}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Description
                </label>
                {isEditingDescription ? (
                  <textarea
                    autoFocus
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onBlur={handleSaveDescription}
                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                  />
                ) : (
                  <p
                    onClick={() => setIsEditingDescription(true)}
                    className="mt-1 p-2 rounded cursor-pointer hover:bg-white/5 text-white/70 text-sm min-h-12 break-words"
                  >
                    {editDescription || 'Click to add description...'}
                  </p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={
                    todo.dueDate
                      ? new Date(todo.dueDate).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    onUpdate({
                      dueDate: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : undefined,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Priority
                </label>
                <select
                  value={todo.priority}
                  onChange={(e) =>
                    onUpdate({
                      priority: e.target.value as 'low' | 'medium' | 'high',
                    })
                  }
                  className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Tags
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {todo.tagIds.map((tagId) => {
                    const tag = tags.find((t) => t.id === tagId);
                    if (!tag) return null;
                    return (
                      <motion.button
                        key={tag.id}
                        onClick={() => onRemoveTag(tag.id)}
                        className="px-2 py-1 rounded text-xs text-white flex items-center gap-1"
                        style={{ backgroundColor: tag.color + '30' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag.name}
                        <span>✕</span>
                      </motion.button>
                    );
                  })}
                </div>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      onAddTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Add tag...</option>
                  {tags
                    .filter((t) => !todo.tagIds.includes(t.id))
                    .map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Subtasks */}
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase">
                  Subtasks {completedSubtasks}/{todo.subtasks.length}
                </label>
                {todo.subtasks.length > 0 && (
                  <div className="mt-2 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subtaskProgress}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                )}
                <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                  {todo.subtasks.map((subtask) => (
                    <motion.div
                      key={subtask.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-white/5"
                    >
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => onToggleSubtask(subtask.id)}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <span
                        className={`flex-1 text-sm ${
                          subtask.completed
                            ? 'line-through text-white/40'
                            : 'text-white/70'
                        }`}
                      >
                        {subtask.text}
                      </span>
                      <motion.button
                        onClick={() => onDeleteSubtask(subtask.id)}
                        whileHover={{ scale: 1.1 }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ✕
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddSubtask();
                    }}
                    placeholder="Add subtask..."
                    className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <motion.button
                    onClick={handleAddSubtask}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t border-white/10 text-xs text-white/40 space-y-1">
                <p>Created: {format(new Date(todo.createdAt), 'MMM d, yyyy')}</p>
                {todo.editedAt && (
                  <p>Edited: {format(new Date(todo.editedAt), 'MMM d, yyyy')}</p>
                )}
                {todo.completedAt && (
                  <p>
                    Completed: {format(new Date(todo.completedAt), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
