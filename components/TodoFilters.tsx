'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FilterType } from '@/lib/types';

interface TodoFiltersProps {
  filterBy: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  activeTodos: number;
  completedTodos: number;
  historyCount: number;
}

export function TodoFilters({
  filterBy,
  onFilterChange,
  onClearCompleted,
  activeTodos,
  completedTodos,
  historyCount,
}: TodoFiltersProps) {
  const filters: FilterType[] = ['all', 'active', 'completed', 'history'];

  const getLabel = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return 'All';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'history':
        return 'History';
      default:
        return filter;
    }
  };

  const getCount = (filter: FilterType) => {
    switch (filter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      case 'history':
        return historyCount;
      case 'all':
        return activeTodos + completedTodos;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`relative px-4 py-2 rounded font-medium transition-all duration-200 flex items-center gap-2 ${
              filterBy === filter
                ? 'text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {filterBy === filter && (
              <motion.div
                layoutId="underline"
                className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-indigo-500/20 rounded"
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                style={{ zIndex: -1 }}
              />
            )}
            {getLabel(filter)}
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${
                filterBy === filter
                  ? 'bg-indigo-500/50 text-indigo-100'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {getCount(filter)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Clear Completed Button */}
      {filterBy === 'completed' && completedTodos > 0 && (
        <motion.button
          onClick={onClearCompleted}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg font-medium transition-all duration-200"
        >
          Clear Completed
        </motion.button>
      )}
    </div>
  );
}
