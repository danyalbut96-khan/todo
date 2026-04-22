'use client';

import { Todo, HistoryItem } from './types';

export function exportTodosAsJSON(todos: Todo[], history: HistoryItem[]) {
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    todos,
    history,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportTodosAsMarkdown(todos: Todo[]): string {
  let markdown = '# Todo List\n\n';
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  if (active.length > 0) {
    markdown += '## Active Tasks\n\n';
    active.forEach((todo) => {
      const priority = `[${todo.priority.toUpperCase()}]`;
      markdown += `- [ ] ${priority} ${todo.text}\n`;
      if (todo.description) {
        markdown += `  > ${todo.description}\n`;
      }
      if (todo.subtasks.length > 0) {
        todo.subtasks.forEach((subtask) => {
          markdown += `  - [${subtask.completed ? 'x' : ' '}] ${subtask.text}\n`;
        });
      }
    });
    markdown += '\n';
  }

  if (completed.length > 0) {
    markdown += '## Completed Tasks\n\n';
    completed.forEach((todo) => {
      markdown += `- [x] ~~${todo.text}~~\n`;
    });
  }

  return markdown;
}

export function downloadMarkdown(todos: Todo[]) {
  const markdown = exportTodosAsMarkdown(todos);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-${new Date().toISOString().split('T')[0]}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importTodosFromJSON(file: File): Promise<{
  todos: Todo[];
  history: HistoryItem[];
} | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (data.todos && Array.isArray(data.todos)) {
          resolve({
            todos: data.todos,
            history: data.history || [],
          });
        } else {
          resolve(null);
        }
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        resolve(null);
      }
    };
    reader.readAsText(file);
  });
}
