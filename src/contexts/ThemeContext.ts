import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);