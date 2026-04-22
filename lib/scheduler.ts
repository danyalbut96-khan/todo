'use client';

import { Todo } from './types';

export function scheduleNotifications(todos: Todo[]) {
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Check for tasks due in 15 minutes
  const now = new Date();
  const fifteenMinutesLater = new Date(now.getTime() + 15 * 60 * 1000);

  todos.forEach((todo) => {
    if (todo.completed || !todo.dueDate) return;

    const dueDate = new Date(todo.dueDate);

    // Check if task is due within 15 minutes
    if (dueDate > now && dueDate <= fifteenMinutesLater) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Task Reminder', {
          body: `${todo.text} is due in 15 minutes`,
          icon: '✓',
          tag: `todo-${todo.id}`,
        });
      }
    }

    // Check if task is overdue
    if (dueDate < now) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Overdue Task', {
          body: `${todo.text} is overdue`,
          icon: '⚠️',
          tag: `todo-${todo.id}`,
        });
      }
    }
  });
}

export function setupNotificationScheduler(todos: Todo[]) {
  // Run immediately
  scheduleNotifications(todos);

  // Run every minute
  const interval = setInterval(() => {
    scheduleNotifications(todos);
  }, 60 * 1000);

  return () => clearInterval(interval);
}
