import React, { useState, ReactNode } from 'react';
import { defaultDataContext, DataContext, DataContextType } from '../contexts';

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [allCards, setAllCards] = useState<DataContextType['allCards']>(defaultDataContext.allCards);
  
  const value: DataContextType = { allCards, setAllCards };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};