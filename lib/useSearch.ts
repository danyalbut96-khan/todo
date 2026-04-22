'use client';

import { useState, useCallback, useMemo } from 'react';
import { Todo, Tag } from './types';
import Fuse from 'fuse.js';

export function useSearch(todos: Todo[], tags: Tag[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(todos, {
      keys: ['text', 'description', 'tagIds'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [todos]);

  // Perform search
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const fuseResults = fuse.search(searchQuery);
    const activeTasks = fuseResults
      .filter((r) => !r.item.completed)
      .map((r) => r.item);
    const completedTasks = fuseResults
      .filter((r) => r.item.completed)
      .map((r) => r.item);

    return {
      active: activeTasks,
      completed: completedTasks,
      all: fuseResults.map((r) => r.item),
    };
  }, [searchQuery, fuse]);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Cmd+K or Ctrl+K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }

    // Escape to close
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    results,
    isOpen,
    openSearch,
    closeSearch,
    handleKeyDown,
  };
}
