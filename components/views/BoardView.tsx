'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Todo, Tag } from '@/lib/types';
import { TaskCard } from '@/components/task/TaskCard';

interface BoardViewProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdateStatus: (id: string, status: 'todo' | 'inprogress' | 'done') => void;
  onSelectTodo: (todo: Todo) => void;
  selectedTodoId?: string | null;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'from-blue-500/20' },
  { id: 'inprogress', title: 'In Progress', color: 'from-amber-500/20' },
  { id: 'done', title: 'Done', color: 'from-emerald-500/20' },
];

export function BoardView({
  todos,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onUpdateStatus,
  onSelectTodo,
  selectedTodoId,
}: BoardViewProps) {
  const todosByStatus = {
    todo: todos.filter((t) => t.status === 'todo' && !t.completed),
    inprogress: todos.filter((t) => t.status === 'inprogress'),
    done: todos.filter((t) => t.status === 'done' || t.completed),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
      {COLUMNS.map((column) => (
        <motion.div
          key={column.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-b ${column.color} to-white/[0.02] border border-white/10 rounded-lg p-4 min-h-96`}
        >
          {/* Column Header */}
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span>{column.title}</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
              {
                todosByStatus[column.id as keyof typeof todosByStatus]
                  .length
              }
            </span>
          </h3>

          {/* Tasks */}
          <div className="space-y-3">
            {todosByStatus[column.id as keyof typeof todosByStatus].map(
              (todo) => (
                <motion.div
                  key={todo.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer?.setData('todoId', todo.id);
                    e.dataTransfer!.effectAllowed = 'move';
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer!.dropEffect = 'move';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const draggedId = e.dataTransfer?.getData('todoId');
                    if (draggedId && draggedId !== todo.id) {
                      onUpdateStatus(
                        draggedId,
                        column.id as 'todo' | 'inprogress' | 'done'
                      );
                    }
                  }}
                  className="cursor-grab active:cursor-grabbing"
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, opacity: 0.8 }}
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
              )
            )}
          </div>

          {/* Drop Zone */}
          <motion.div
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('bg-white/10');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('bg-white/10');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('bg-white/10');
              const draggedId = e.dataTransfer?.getData('todoId');
              if (draggedId) {
                onUpdateStatus(
                  draggedId,
                  column.id as 'todo' | 'inprogress' | 'done'
                );
              }
            }}
            className="mt-4 p-4 border-2 border-dashed border-white/20 rounded-lg text-center text-white/40 text-sm transition-colors"
          >
            Drop here
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
