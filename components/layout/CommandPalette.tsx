'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '@/lib/types';
import Fuse from 'fuse.js';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  todos,
  onSelectTodo,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const fuse = React.useMemo(() => {
    return new Fuse(todos, {
      keys: ['text', 'description'],
      threshold: 0.3,
    });
  }, [todos]);

  const results = React.useMemo(() => {
    if (!query.trim()) {
      return {
        active: todos.filter((t) => !t.completed).slice(0, 5),
        completed: todos.filter((t) => t.completed).slice(0, 5),
      };
    }

    const fuseResults = fuse.search(query);
    return {
      active: fuseResults
        .filter((r) => !r.item.completed)
        .slice(0, 5)
        .map((r) => r.item),
      completed: fuseResults
        .filter((r) => r.item.completed)
        .slice(0, 5)
        .map((r) => r.item),
    };
  }, [query, fuse, todos]);

  const allResults = [...results.active, ...results.completed];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % allResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? allResults.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (allResults[selectedIndex]) {
          onSelectTodo(allResults[selectedIndex]);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allResults, selectedIndex, onSelectTodo, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Search Input */}
              <div className="p-4 border-b border-white/10">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search tasks... (⌘K)"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {allResults.length === 0 ? (
                  <div className="p-8 text-center text-white/40">
                    No tasks found
                  </div>
                ) : (
                  <>
                    {/* Active Tasks */}
                    {results.active.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase bg-white/5 border-b border-white/10">
                          Active Tasks
                        </div>
                        {results.active.map((todo, idx) => (
                          <motion.button
                            key={todo.id}
                            onClick={() => {
                              onSelectTodo(todo);
                              onClose();
                            }}
                            className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
                              selectedIndex === idx
                                ? 'bg-indigo-600/50'
                                : 'hover:bg-white/5'
                            }`}
                            whileHover={{ x: 4 }}
                          >
                            <p className="text-white font-medium truncate">
                              {todo.text}
                            </p>
                            {todo.description && (
                              <p className="text-white/50 text-sm truncate">
                                {todo.description}
                              </p>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Completed Tasks */}
                    {results.completed.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase bg-white/5 border-b border-white/10">
                          Completed
                        </div>
                        {results.completed.map((todo, idx) => (
                          <motion.button
                            key={todo.id}
                            onClick={() => {
                              onSelectTodo(todo);
                              onClose();
                            }}
                            className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
                              selectedIndex === results.active.length + idx
                                ? 'bg-indigo-600/50'
                                : 'hover:bg-white/5'
                            }`}
                            whileHover={{ x: 4 }}
                          >
                            <p className="text-white/60 line-through font-medium truncate">
                              {todo.text}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/10 text-xs text-white/40 flex justify-between">
                <span>
                  <kbd className="bg-white/10 px-1 rounded">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="bg-white/10 px-1 rounded">Enter</kbd> Select
                </span>
                <span>
                  <kbd className="bg-white/10 px-1 rounded">Esc</kbd> Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
