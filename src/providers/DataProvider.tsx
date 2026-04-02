import React, { useState, ReactNode } from 'react';
import { defaultDataContext, DataContext, DataContextType } from '../contexts';

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<boolean>(defaultDataContext.data);
  
  const value: DataContextType = { data, setData };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};