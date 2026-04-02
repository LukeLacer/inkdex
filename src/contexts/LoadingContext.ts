import { createContext } from 'react';

export interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string | undefined;
  setLoading: (loading: boolean, message?: string) => void;
}

export const defaultLoadingContext: LoadingContextType = {
  isLoading: false,
  loadingMessage: undefined,
  setLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(defaultLoadingContext);