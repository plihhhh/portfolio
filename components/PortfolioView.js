'use client';

import { useEffect, useState } from 'react';
import Portfolio from '@/components/Portfolio';

// Wrapper client kecil: pegang state tema (light/dark).
// Data konten datang dari file content/portfolio.json (diedit lewat /admin).
export default function PortfolioView({ data }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Portfolio
      data={data}
      theme={theme}
      onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    />
  );
}
