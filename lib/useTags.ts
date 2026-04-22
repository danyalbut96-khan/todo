'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tag } from './types';
import { nanoid } from 'nanoid';

const TAGS_KEY = 'cloudaik_tags';

const DEFAULT_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#0ea5e9', // sky
  '#6366f1', // indigo
  '#a855f7', // purple
  '#ec4899', // pink
];

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load tags from localStorage on mount
  useEffect(() => {
    const savedTags = localStorage.getItem(TAGS_KEY);
    if (savedTags) {
      try {
        setTags(JSON.parse(savedTags));
      } catch (err) {
        console.error('Failed to parse tags:', err);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save tags to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
    }
  }, [tags, isHydrated]);

  const addTag = useCallback((name: string, color?: string) => {
    if (!name.trim()) return null;

    const newTag: Tag = {
      id: nanoid(),
      name: name.trim(),
      color: color || DEFAULT_COLORS[0],
    };

    setTags((prev) => [...prev, newTag]);
    return newTag;
  }, []);

  const deleteTag = useCallback((id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  }, []);

  const updateTag = useCallback((id: string, name: string, color: string) => {
    setTags((prev) =>
      prev.map((tag) =>
        tag.id === id ? { ...tag, name, color } : tag
      )
    );
  }, []);

  return {
    tags,
    addTag,
    deleteTag,
    updateTag,
    defaultColors: DEFAULT_COLORS,
    isHydrated,
  };
}
