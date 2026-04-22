'use client';

import React, { useEffect } from 'react';
import { useTodos } from '@/lib/useTodos';
import { useTags } from '@/lib/useTags';
import { useTheme } from '@/lib/useTheme';
import { useSearch } from '@/lib/useSearch';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { RightPanel } from '@/components/layout/RightPanel';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { TodoInput } from '@/components/TodoInput';
import { TodoFilters } from '@/components/TodoFilters';
import { HistoryPanel } from '@/components/HistoryPanel';
import { ListView } from '@/components/views/ListView';
import { BoardView } from '@/components/views/BoardView';
import { TodayView } from '@/components/views/TodayView';
import { DashboardView } from '@/components/views/DashboardView';
import { PomodoroTimer } from '@/components/ui/PomodoroTimer';
import { AnimatePresence, motion } from 'framer-motion';
import { isToday, isBefore, startOfToday } from 'date-fns';

export default function Home() {
  const {
    todos,
    history,
    filteredTodos,
    todosByStatus,
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    selectedTodoId,
    setSelectedTodoId,
    addTodo,
    editTodo,
    updateTodoField,
    updateStatus,
    toggleComplete,
    deleteTodo,
    restoreFromHistory,
    clearCompleted,
    clearHistory,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    addTag,
    removeTag,
    stats,
    isHydrated,
  } = useTodos();

  const { tags, addTag: createTag, deleteTag, updateTag } = useTags();
  const { theme, toggleTheme, fontSize, setFontSize, isHydrated: themeHydrated } = useTheme();
  const { searchQuery, setSearchQuery, results, isOpen: isSearchOpen, openSearch, closeSearch, handleKeyDown } = useSearch(todos, tags);

  const [viewType, setViewType] = React.useState<'list' | 'board' | 'calendar'>('list');
  const [isFocusMode, setIsFocusMode] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Setup keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Calculate overdue count
  const overdueCount = todos.filter((t) => {
    if (t.completed || !t.dueDate) return false;
    return isBefore(new Date(t.dueDate), startOfToday());
  }).length;

  // Get selected todo
  const selectedTodo = todos.find((t) => t.id === selectedTodoId);

  if (!isHydrated || !themeHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0f1a] via-[#0d0f1a] to-[#1a1d2e] flex items-center justify-center">
        <div className="text-white/60 font-mono">Loading...</div>
      </div>
    );
  }

  const getEmptyStateMessage = () => {
    switch (filterBy) {
      case 'active':
        return { emoji: '🌙', message: 'Your mind is clear. For now.' };
      case 'completed':
        return { emoji: '✨', message: 'Nothing finished yet. Start small.' };
      case 'history':
        return { emoji: '👻', message: 'No skeletons here.' };
      default:
        return { emoji: '📝', message: 'Add your first task to get started!' };
    }
  };

  const emptyState = getEmptyStateMessage();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0f1a] via-[#0d0f1a] to-[#1a1d2e] flex items-center justify-center">
        <div className="text-white/60 font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0f1a] via-[#0d0f1a] to-[#1a1d2e] relative overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-l from-indigo-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-2 font-bricolage">
            Task Master
          </h1>
          <p className="text-indigo-400/60 font-dm-mono">
            Focus on what matters
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/8 rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Input */}
          <TodoInput onAdd={addTodo} />

          {/* Filters */}
          <TodoFilters
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            onClearCompleted={clearCompleted}
            activeTodos={stats.remaining}
            completedTodos={stats.completed}
            historyCount={history.length}
          />

          {/* Sort Selector */}
          {(filterBy === 'all' || filterBy === 'active' || filterBy === 'completed') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex gap-2 items-center"
            >
              <label className="text-sm text-white/60 font-dm-mono">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="priority">Priority</option>
                <option value="date">Date Added</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-3 bg-white/5 border border-white/10 rounded-lg"
          >
            <p className="text-sm text-white/60 font-dm-mono">
              <span className="text-indigo-400 font-semibold">
                {stats.total}
              </span>{' '}
              tasks · <span className="text-emerald-400 font-semibold">
                {stats.completed}
              </span>{' '}
              completed ·{' '}
              <span className="text-amber-400 font-semibold">
                {stats.remaining}
              </span>{' '}
              remaining
            </p>
          </motion.div>

          {/* Todo List or History */}
          <div className="min-h-[300px]">
            {filterBy === 'history' ? (
              <HistoryPanel
                history={history}
                onRestore={restoreFromHistory}
                onClearHistory={clearHistory}
              />
            ) : (filteredTodos as any[]).length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-3">{emptyState.emoji}</div>
                <p className="text-white/60 font-mono">{emptyState.message}</p>
              </motion.div>
            ) : (
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {(filteredTodos as any[]).map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleComplete}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-white/40 hover:text-white/80 transition-all duration-200">
            Made with ❤️ by{' '}
            <a
              href="https://cloudexify.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Cloudexify
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

