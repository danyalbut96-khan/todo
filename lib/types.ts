export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
  editedAt?: string;
}

export interface HistoryItem {
  id: string;
  text: string;
  action: 'deleted' | 'completed';
  timestamp: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'history';
export type SortType = 'priority' | 'date' | 'alpha';
