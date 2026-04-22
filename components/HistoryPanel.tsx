'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface HistoryPanelProps {
  history: HistoryItem[];
  onRestore: (id: string) => void;
  onClearHistory: () => void;
}

export function HistoryPanel({
  history,
  onRestore,
  onClearHistory,
}: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-4xl mb-3">👻</div>
        <p className="text-white/60 font-mono">No skeletons here.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {history.length > 0 && (
        <motion.button
          onClick={onClearHistory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg font-medium transition-all duration-200"
        >
          Clear History
        </motion.button>
      )}

      <AnimatePresence mode="popLayout">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/8 rounded-lg group hover:border-white/15 transition-all duration-200 flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white/70 font-mono truncate">{item.text}</p>
              <div className="flex gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.action === 'deleted'
                      ? 'bg-red-500/30 text-red-300'
                      : 'bg-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {item.action === 'deleted' ? '🗑️ Deleted' : '✓ Completed'}
                </span>
                <span className="text-xs text-white/40">
                  {formatDistanceToNow(new Date(item.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            {item.action === 'deleted' && (
              <motion.button
                onClick={() => onRestore(item.id)}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium transition-all duration-200"
              >
                Restore
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
