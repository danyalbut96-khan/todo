'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, HistoryItem, FilterType, SortType, Subtask } from './types';
import { nanoid } from 'nanoid';
import { isToday, isBefore, startOfToday } from 'date-fns';

const TODOS_KEY = 'cloudaik_todos';
const HISTORY_KEY = 'cloudaik_history';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('priority');
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(TODOS_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);

    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        // Ensure new fields exist on loaded todos for backward compatibility
        const upgraded = parsed.map((todo: any) => ({
          ...todo,
          description: todo.description || '',
          status: todo.status || 'todo',
          dueDate: todo.dueDate || undefined,
          recurrence: todo.recurrence || null,
          tagIds: todo.tagIds || [],
          subtasks: todo.subtasks || [],
        }));
        setTodos(upgraded);
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

  // Add todo with extended fields
  const addTodo = useCallback(
    (
      text: string,
      priority: 'low' | 'medium' | 'high' = 'medium',
      description: string = '',
      dueDate?: string,
      tagIds: string[] = []
    ) => {
      if (!text.trim()) return;

      const newTodo: Todo = {
        id: nanoid(),
        text: text.trim(),
        description,
        completed: false,
        priority,
        status: 'todo',
        dueDate,
        recurrence: null,
        tagIds,
        subtasks: [],
        createdAt: new Date().toISOString(),
      };

      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    },
    []
  );

  // Edit todo with any field
  const editTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, editedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  // Update specific todo field
  const updateTodoField = useCallback(
    <K extends keyof Todo>(id: string, field: K, value: Todo[K]) => {
      editTodo(id, { [field]: value } as Partial<Todo>);
    },
    [editTodo]
  );

  const toggleComplete = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              status: !todo.completed ? 'done' : 'todo',
              completedAt: !todo.completed ? new Date().toISOString() : undefined,
            }
          : todo
      )
    );
  }, []);

  // Update todo status (for Kanban)
  const updateStatus = useCallback((id: string, status: 'todo' | 'inprogress' | 'done') => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status,
              completed: status === 'done',
              completedAt: status === 'done' ? new Date().toISOString() : undefined,
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
        description: '',
        completed: false,
        priority: 'medium',
        status: 'todo',
        tagIds: [],
        subtasks: [],
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

  // Subtask management
  const addSubtask = useCallback((todoId: string, text: string) => {
    if (!text.trim()) return;

    const newSubtask: Subtask = {
      id: nanoid(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, subtasks: [...todo.subtasks, newSubtask] }
          : todo
      )
    );
  }, []);

  const toggleSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : todo
      )
    );
  }, []);

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter((s) => s.id !== subtaskId),
            }
          : todo
      )
    );
  }, []);

  // Tag management
  const addTag = useCallback((todoId: string, tagId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId && !todo.tagIds.includes(tagId)
          ? { ...todo, tagIds: [...todo.tagIds, tagId] }
          : todo
      )
    );
  }, []);

  const removeTag = useCallback((todoId: string, tagId: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, tagIds: todo.tagIds.filter((id) => id !== tagId) }
          : todo
      )
    );
  }, []);

  // Filter todos
  const getFilteredTodos = useCallback(() => {
    let filtered = todos;
    const today = startOfToday();

    if (filterBy === 'active') {
      filtered = todos.filter((t) => !t.completed);
    } else if (filterBy === 'completed') {
      filtered = todos.filter((t) => t.completed);
    } else if (filterBy === 'today') {
      filtered = todos.filter((t) => {
        if (t.completed) return false;
        if (t.dueDate) return isToday(new Date(t.dueDate));
        return false;
      });
    } else if (filterBy === 'upcoming') {
      filtered = todos.filter((t) => {
        if (t.completed) return false;
        if (t.dueDate) return !isBefore(new Date(t.dueDate), today);
        return false;
      });
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
    } else if (sortBy === 'duedate') {
      filtered = [...filtered].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return (
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      });
    }

    return filtered;
  }, [todos, filterBy, sortBy]);

  const filteredTodos =
    filterBy === 'history' ? (history as any[]) : getFilteredTodos();

  // Group todos by status for Kanban view
  const todosByStatus = {
    todo: todos.filter((t) => t.status === 'todo' && !t.completed),
    inprogress: todos.filter((t) => t.status === 'inprogress'),
    done: todos.filter((t) => t.status === 'done' || t.completed),
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    remaining: todos.filter((t) => !t.completed).length,
  };

  return {
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
  };
}
