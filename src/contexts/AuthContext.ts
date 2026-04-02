import { createContext } from 'react';

export interface User {
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});