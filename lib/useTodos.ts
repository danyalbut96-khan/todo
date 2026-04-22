'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, HistoryItem, FilterType, SortType } from './types';
import { nanoid } from 'nanoid';

const TODOS_KEY = 'cloudaik_todos';
const HISTORY_KEY = 'cloudaik_history';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('priority');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(TODOS_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);

    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (err) {
        console.error('Failed to parse todos:', err);
      }
    }

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Failed to parse history:', err);
      }
    }

    setIsHydrated(true);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }
  }, [todos, isHydrated]);

  // Save history to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, isHydrated]);

  const addTodo = useCallback((text: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: nanoid(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    if (!newText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText.trim(), editedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : undefined,
            }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    const todoToDelete = todos.find((t) => t.id === id);
    if (todoToDelete) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setHistory((prev) => [
        {
          id,
          text: todoToDelete.text,
          action: 'deleted',
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  }, [todos]);

  const restoreFromHistory = useCallback((id: string) => {
    const historyItem = history.find((h) => h.id === id);
    if (historyItem) {
      const todoToRestore: Todo = {
        id,
        text: historyItem.text,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
      };

      setTodos((prev) => [todoToRestore, ...prev]);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    }
  }, [history]);

  const clearCompleted = useCallback(() => {
    const completedTodos = todos.filter((t) => t.completed);
    completedTodos.forEach((todo) => {
      setHistory((prev) => [
        {
          id: todo.id,
          text: todo.text,
          action: 'completed',
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    });

    setTodos((prev) => prev.filter((t) => !t.completed));
  }, [todos]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Filter todos
  const getFilteredTodos = useCallback(() => {
    let filtered = todos;

    if (filterBy === 'active') {
      filtered = todos.filter((t) => !t.completed);
    } else if (filterBy === 'completed') {
      filtered = todos.filter((t) => t.completed);
    }

    // Sort
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered = [...filtered].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'alpha') {
      filtered = [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    }

    return filtered;
  }, [todos, filterBy, sortBy]);

  const filteredTodos =
    filterBy === 'history' ? history : getFilteredTodos();

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    remaining: todos.filter((t) => !t.completed).length,
  };

  return {
    todos,
    history,
    filteredTodos,
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    addTodo,
    editTodo,
    toggleComplete,
    deleteTodo,
    restoreFromHistory,
    clearCompleted,
    clearHistory,
    stats,
    isHydrated,
  };
}
