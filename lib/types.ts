export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inprogress' | 'done';
  dueDate?: string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'weekdays' | null;
  tagIds: string[];
  subtasks: Subtask[];
  createdAt: string;
  completedAt?: string;
  editedAt?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string; // hex color
}

export interface HistoryItem {
  id: string;
  text: string;
  action: 'deleted' | 'completed';
  timestamp: string;
}

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'history' | 'today' | 'upcoming';
export type SortType = 'priority' | 'date' | 'alpha' | 'duedate';
export type ViewType = 'list' | 'board' | 'calendar';
export type ThemeType = 'dark' | 'light';
export type FontSizeType = 'small' | 'medium' | 'large';
