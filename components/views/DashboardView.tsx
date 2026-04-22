'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Todo } from '@/lib/types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStats } from '@/lib/useStats';

interface DashboardViewProps {
  todos: Todo[];
  history: any[];
}

export function DashboardView({ todos, history }: DashboardViewProps) {
  const stats = useStats(todos, history);

  const priorityData = [
    { name: 'High', value: stats.byPriority.high, fill: '#ef4444' },
    { name: 'Medium', value: stats.byPriority.medium, fill: '#f59e0b' },
    { name: 'Low', value: stats.byPriority.low, fill: '#10b981' },
  ];

  const dayData = stats.dayNames.map((day, idx) => ({
    day: day.slice(0, 3),
    tasks: stats.dayCompletions[idx],
  }));

  const completionData = [
    { name: 'Completed', value: todos.filter((t) => t.completed).length },
    { name: 'Remaining', value: todos.filter((t) => !t.completed).length },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg"
        >
          <p className="text-white/60 text-sm uppercase font-semibold">
            Total Tasks
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.totalCreated}
          </p>
        </motion.div>

        {/* Completed This Week */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-lg"
        >
          <p className="text-white/60 text-sm uppercase font-semibold">
            This Week
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.completedThisWeek}
          </p>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-lg"
        >
          <p className="text-white/60 text-sm uppercase font-semibold">
            Streak
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.currentStreak} days
          </p>
        </motion.div>

        {/* Completion Rate */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/30 rounded-lg"
        >
          <p className="text-white/60 text-sm uppercase font-semibold">
            Completion
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.completionRate}%
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg"
        >
          <h3 className="text-white font-semibold mb-4">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Completion Rate */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg"
        >
          <h3 className="text-white font-semibold mb-4">Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Productivity by Day */}
        <motion.div
          variants={cardVariants}
          className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg 2xl:col-span-2"
        >
          <h3 className="text-white font-semibold mb-4">
            Most Productive Days
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <Bar dataKey="tasks" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
