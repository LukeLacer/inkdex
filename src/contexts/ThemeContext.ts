import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);