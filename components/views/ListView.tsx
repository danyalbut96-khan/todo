'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Todo, Tag } from '@/lib/types';
import { TaskCard } from '@/components/task/TaskCard';

interface ListViewProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onSelectTodo: (todo: Todo) => void;
  selectedTodoId?: string | null;
}

export function ListView({
  todos,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onSelectTodo,
  selectedTodoId,
}: ListViewProps) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-5xl mb-3">📝</div>
        <p className="text-white/60 font-mono">No tasks to show</p>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="space-y-3">
      {todos.map((todo, index) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TaskCard
            todo={todo}
            tags={tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onClick={() => onSelectTodo(todo)}
            isSelected={selectedTodoId === todo.id}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
