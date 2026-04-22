'use client';

import { useMemo } from 'react';
import { Todo, HistoryItem } from './types';
import { startOfWeek, endOfWeek, isWithinInterval, isToday, startOfDay } from 'date-fns';

export function useStats(todos: Todo[], history: HistoryItem[]) {
  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    // Total tasks created
    const totalCreated = todos.length;

    // Completed this week
    const completedThisWeek = todos.filter((t) => {
      if (!t.completedAt) return false;
      const completedDate = new Date(t.completedAt);
      return isWithinInterval(completedDate, { start: weekStart, end: weekEnd });
    }).length;

    // Completion rate
    const completed = todos.filter((t) => t.completed).length;
    const completionRate =
      todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

    // Tasks by priority
    const byPriority = {
      high: todos.filter((t) => t.priority === 'high' && !t.completed).length,
      medium: todos.filter((t) => t.priority === 'medium' && !t.completed).length,
      low: todos.filter((t) => t.priority === 'low' && !t.completed).length,
    };

    // Current streak (days with at least 1 task completed)
    let streak = 0;
    let currentDate = startOfDay(now);
    while (streak < 365) {
      const dayCompletions = todos.filter((t) => {
        if (!t.completedAt) return false;
        const completedDate = startOfDay(new Date(t.completedAt));
        return completedDate.getTime() === currentDate.getTime();
      }).length;

      if (dayCompletions > 0) {
        streak++;
        currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }

    // Most productive day (0=Sunday, 6=Saturday)
    const dayCompletions = new Array(7).fill(0);
    todos
      .filter((t) => t.completedAt)
      .forEach((t) => {
        const day = new Date(t.completedAt!).getDay();
        dayCompletions[day]++;
      });

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return {
      totalCreated,
      completedThisWeek,
      completionRate,
      currentStreak: streak,
      byPriority,
      dayCompletions,
      dayNames,
    };
  }, [todos, history]);

  return stats;
}
