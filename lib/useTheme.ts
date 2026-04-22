'use client';

import { useState, useEffect } from 'react';
import { ThemeType, FontSizeType } from './types';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [fontSize, setFontSize] = useState<FontSizeType>('medium');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('taskflow_theme') as ThemeType;
    const savedFontSize = localStorage.getItem('taskflow_fontSize') as FontSizeType;

    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    setIsHydrated(true);
  }, []);

  // Save theme to localStorage and apply to document
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('taskflow_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isHydrated]);

  // Save font size to localStorage and apply to document
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('taskflow_fontSize', fontSize);
      document.documentElement.setAttribute('data-font-size', fontSize);
    }
  }, [fontSize, isHydrated]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    fontSize,
    setFontSize,
    isHydrated,
  };
}
