import React, { useState, ReactNode, useEffect } from 'react';
import { defaultThemeContext, ThemeContext, ThemeContextType } from '../contexts/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(defaultThemeContext.theme);
  
  const value: ThemeContextType = { theme, setTheme };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};