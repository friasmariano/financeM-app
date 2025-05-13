'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { toggle } from '../lib/features/theme/store/theme-slice';

export default function ThemeProvider() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.data.isDark);

  useEffect(() => {
    const themeClass = isDark ? 'dark' : 'light';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeClass);
  }, [isDark]);

  return (
    <button
      className="theme-button"
      aria-label='Toggle theme'
      title='Toggle theme'
      onClick={() => dispatch(toggle())}
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        size="lg"
      />
    </button>
  );
}
