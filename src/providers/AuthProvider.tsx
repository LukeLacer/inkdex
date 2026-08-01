import React, { useState, ReactNode, useContext, useEffect } from 'react';

import { defaultAuthContext, AuthContext, AuthContextType } from '../contexts/AuthContext';
import { LoadingContext, LoadingContextType } from '../contexts';
import { firebaseLogout, signInGoogleWithGooglePopup } from '../services';
import { loadingAuth } from '../utils/strings';
import { FirebaseAuth } from '../services';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultAuthContext.isAuthenticated);
  const { setLoading } = useContext<LoadingContextType>(LoadingContext);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        localStorage.setItem('auth', JSON.stringify(FirebaseAuth))
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('auth')
        setIsAuthenticated(false)
      }
    });
  }, [])
  

  const logout = () => {
    setLoading(true, loadingAuth.loggingOut)
    firebaseLogout().then(() => {
      localStorage.removeItem('auth')
      setIsAuthenticated(false)
      setLoading(false)
    })
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