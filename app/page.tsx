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

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gradient-to-br from-[#0d0f1a] via-[#0d0f1a] to-[#1a1d2e]' : 'bg-[#f8f9fc]'}`}>
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

      {/* Header */}
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        onSearchOpen={openSearch}
        overdueCount={overdueCount}
      />

      {/* Main Layout */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <Sidebar
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          tags={tags}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            {/* View Selector */}
            {filterBy === 'all' && (
              <div className="flex gap-2 mb-6">
                {(['list', 'board', 'calendar'] as const).map((view) => (
                  <motion.button
                    key={view}
                    onClick={() => setViewType(view)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      viewType === view
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {view === 'list' && '📋'}
                    {view === 'board' && '📊'}
                    {view === 'calendar' && '📅'}
                    {' '}
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Content */}
            {filterBy === 'all' && viewType === 'list' && (
              <>
                <TodoInput onAdd={addTodo} />
                <TodoFilters
                  filterBy={filterBy}
                  onFilterChange={setFilterBy}
                  onClearCompleted={clearCompleted}
                  activeTodos={stats.remaining}
                  completedTodos={stats.completed}
                  historyCount={history.length}
                />
                <ListView
                  todos={todos.filter((t) => !t.completed)}
                  tags={tags}
                  onToggle={toggleComplete}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onSelectTodo={(todo) => setSelectedTodoId(todo.id)}
                  selectedTodoId={selectedTodoId}
                />
              </>
            )}

            {filterBy === 'all' && viewType === 'board' && (
              <BoardView
                todos={todos}
                tags={tags}
                onToggle={toggleComplete}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onUpdateStatus={updateStatus}
                onSelectTodo={(todo) => setSelectedTodoId(todo.id)}
                selectedTodoId={selectedTodoId}
              />
            )}

            {filterBy === 'today' && (
              <>
                <TodoInput onAdd={addTodo} />
                <TodayView
                  todos={todos.filter((t) => {
                    if (t.completed) return false;
                    if (t.dueDate) return isToday(new Date(t.dueDate));
                    return false;
                  })}
                  tags={tags}
                  onToggle={toggleComplete}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onSelectTodo={(todo) => setSelectedTodoId(todo.id)}
                  selectedTodoId={selectedTodoId}
                />
              </>
            )}

            {filterBy === 'all' && viewType === 'list' && (
              <DashboardView todos={todos} history={history} />
            )}

            {filterBy === 'history' && (
              <HistoryPanel
                history={history}
                onRestore={restoreFromHistory}
                onClearHistory={clearHistory}
              />
            )}
          </div>
        </main>

        {/* Right Panel */}
        <RightPanel
          todo={selectedTodo || null}
          tags={tags}
          onClose={() => setSelectedTodoId(null)}
          onUpdate={(updates) => {
            if (selectedTodoId) {
              editTodo(selectedTodoId, updates);
            }
          }}
          onAddSubtask={(text) => {
            if (selectedTodoId) {
              addSubtask(selectedTodoId, text);
            }
          }}
          onToggleSubtask={(subtaskId) => {
            if (selectedTodoId) {
              toggleSubtask(selectedTodoId, subtaskId);
            }
          }}
          onDeleteSubtask={(subtaskId) => {
            if (selectedTodoId) {
              deleteSubtask(selectedTodoId, subtaskId);
            }
          }}
          onAddTag={(tagId) => {
            if (selectedTodoId) {
              addTag(selectedTodoId, tagId);
            }
          }}
          onRemoveTag={(tagId) => {
            if (selectedTodoId) {
              removeTag(selectedTodoId, tagId);
            }
          }}
          isOpen={!!selectedTodoId}
        />
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={closeSearch}
        todos={todos}
        onSelectTodo={(todo) => {
          setSelectedTodoId(todo.id);
          closeSearch();
        }}
      />

      {/* Focus Mode */}
      <AnimatePresence>
        {isFocusMode && (
          <PomodoroTimer
            isActive={isFocusMode}
            onClose={() => setIsFocusMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-4 text-xs text-white/40 hover:text-white/80 transition-all duration-200"
      >
        <p>
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
      </motion.footer>
    </div>
  );
}

