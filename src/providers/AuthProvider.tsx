import React, { useState, ReactNode } from 'react';
import { AuthContext, AuthContextType, User } from '../contexts/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    const userData: User = { name: username };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  
  const value: AuthContextType = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};