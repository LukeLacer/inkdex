import { createContext } from 'react';

export interface DataContextType {
  data: any;
  setData: (data: any) => void;
}

export const defaultDataContext: DataContextType = {
  data: {},
  setData: () => {},
};

export const DataContext = createContext<DataContextType>(defaultDataContext);