import React, { useState, ReactNode, useContext, useEffect } from 'react';

import { defaultAuthContext, AuthContext, AuthContextType } from '../contexts/AuthContext';
import { LoadingContext, LoadingContextType } from '../contexts';
import { signInGoogleWithGooglePopup } from '../services';
import { loadingAuth } from '../utils/strings';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultAuthContext.isAuthenticated);
  const { setLoading } = useContext<LoadingContextType>(LoadingContext);

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    //TODO: Check if auth token is valid before set auth to true
    if (auth) setIsAuthenticated(true)
  }, [])
  

  const logout = () => {
    setLoading(true, loadingAuth.loggingOut)
    //TODO: Create logout function

    setTimeout(() => {
      localStorage.removeItem('auth')
      setIsAuthenticated(false)
      setLoading(false)
    }, 1000);
  }

  const authenticate = async () => {
    setLoading(true, loadingAuth.logging)

    signInGoogleWithGooglePopup().then(res => {
      localStorage.setItem('auth', JSON.stringify(res))
      setIsAuthenticated(true)
      setLoading(false)
    })
  }
  
  const value: AuthContextType = { isAuthenticated, logout, authenticate };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};