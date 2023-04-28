import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';
  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={24} />
  );
};

export default ThemeSwitch;
