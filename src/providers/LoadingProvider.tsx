import React, { useState, ReactNode } from 'react';
import { defaultLoadingContext, LoadingContext, LoadingContextType } from '../contexts/LoadingContext';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(defaultLoadingContext.isLoading);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(defaultLoadingContext.loadingMessage);

  const setLoading = (loading: boolean, message?: string) => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };
  
  const value: LoadingContextType = { isLoading, loadingMessage, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};