'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterType } from '@/lib/types';

interface SidebarProps {
  filterBy: FilterType;
  onFilterChange: (filter: FilterType) => void;
  tags: any[];
  onTagClick?: (tagId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  { id: 'all', label: 'Dashboard', icon: '📊' },
  { id: 'active', label: 'My Tasks', icon: '✓' },
  { id: 'today', label: 'Today', icon: '🎯' },
  { id: 'upcoming', label: 'Upcoming', icon: '📅' },
  { id: 'completed', label: 'Completed', icon: '✓✓' },
  { id: 'history', label: 'History', icon: '🗑️' },
];

export function Sidebar({ filterBy, onFilterChange, tags, onTagClick, isOpen = true, onClose }: SidebarProps) {
  const [workspaceName, setWorkspaceName] = useState('My Workspace');
  const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(true);

  const handleWorkspaceSave = (newName: string) => {
    if (newName.trim()) {
      setWorkspaceName(newName);
      localStorage.setItem('taskflow_workspace', newName);
    }
    setIsEditingWorkspace(false);
  };

  return (
    <motion.aside
      animate={{ x: isOpen ? 0 : -100 }}
      className="hidden md:flex flex-col w-60 bg-gradient-to-b from-white/5 to-white/[0.02] border-r border-white/8 backdrop-blur-xl h-screen overflow-y-auto sticky top-0 z-40"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✓</span>
          <h1 className="text-lg font-bold text-white font-bricolage">Taskflow</h1>
        </div>

        {/* Workspace Switcher */}
        {isEditingWorkspace ? (
          <input
            autoFocus
            defaultValue={workspaceName}
            onBlur={(e) => handleWorkspaceSave(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleWorkspaceSave(e.currentTarget.value);
              if (e.key === 'Escape') setIsEditingWorkspace(false);
            }}
            className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <button
            onClick={() => setIsEditingWorkspace(true)}
            className="text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            {workspaceName}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onFilterChange(item.id as FilterType)}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
              filterBy === item.id
                ? 'bg-indigo-600/50 text-indigo-100 border border-indigo-500/50'
                : 'text-white/70 hover:text-white/90 hover:bg-white/5'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Tags */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className="flex items-center justify-between w-full text-xs font-semibold text-white/70 hover:text-white/90 mb-2"
        >
          <span>TAGS</span>
          <span>{isTagsOpen ? '−' : '+'}</span>
        </button>

        {isTagsOpen && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <motion.button
                  key={tag.id}
                  onClick={() => onTagClick?.(tag.id)}
                  className="w-full text-left flex items-center gap-2 px-2 py-1 rounded text-xs text-white/70 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="truncate">{tag.name}</span>
                </motion.button>
              ))
            ) : (
              <p className="text-xs text-white/40 italic">No tags yet</p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4 text-xs text-white/40 text-center">
        <p>
          <kbd className="text-xs bg-white/10 px-1 rounded">⌘K</kbd> to search
        </p>
      </div>
    </motion.aside>
  );
}
