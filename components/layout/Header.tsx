'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeType } from '@/lib/types';

interface HeaderProps {
  theme: ThemeType;
  onThemeToggle: () => void;
  onSearchOpen: () => void;
  overdueCount?: number;
}

export function Header({ theme, onThemeToggle, onSearchOpen, overdueCount = 0 }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/10 backdrop-blur-xl"
    >
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left: Logo (mobile only) */}
        <div className="md:hidden flex items-center gap-2">
          <span className="text-2xl">✓</span>
          <h1 className="text-lg font-bold text-white font-bricolage">Taskflow</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <span>🔍</span>
            <span>Search tasks...</span>
            <span className="ml-auto text-xs text-white/40">
              <kbd>⌘K</kbd>
            </span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {overdueCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative cursor-pointer group"
            >
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 bg-red-500/90 text-white text-xs rounded px-2 py-1 pointer-events-none group-hover:pointer-events-auto"
              >
                {overdueCount} overdue
              </motion.div>
            </motion.div>
          )}

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <span>🌙</span> : <span>☀️</span>}
          </motion.button>

          {/* Menu (mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>☰</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
