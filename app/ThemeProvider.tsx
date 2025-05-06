'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeProvider() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        background: 'gray',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
      }}
      aria-label='Toggle theme'
      title='Toggle theme'
      onClick={toggleTheme}
    >
      <FontAwesomeIcon
        icon={theme === 'dark' ? faSun : faMoon}
        size="lg"
        color="white"
      />
    </button>
  );
}
