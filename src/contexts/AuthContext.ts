import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  authenticate: () => void;
}

export const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  logout: () => {},
  authenticate: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);