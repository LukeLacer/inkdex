import { createContext } from 'react';
import { Card } from '../searchEngine/types';

export interface DataContextType {
  allCards: Array<Card> | undefined;
  setAllCards: (allCards: Array<Card> | undefined) => void;
}

export const defaultDataContext: DataContextType = {
  allCards: [],
  setAllCards: () => {},
};

export const DataContext = createContext<DataContextType>(defaultDataContext);