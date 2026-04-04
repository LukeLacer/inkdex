import React, { useState, ReactNode, useEffect, useContext } from 'react';

import { parseCSVToJSON, unzipPublicFile, homeStrings } from '../utils'
import { Card } from '../searchEngine/types'
import { defaultDataContext, DataContext, DataContextType, LoadingContext, LoadingContextType } from '../contexts';

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [allCards, setAllCards] = useState<DataContextType['allCards']>(defaultDataContext.allCards);

  const { setLoading } = useContext<LoadingContextType>(LoadingContext);
  
  useEffect(() => {
      const fetchCardData = async () => {
          setLoading(true, homeStrings.cardLoadingMessage)
          try {
              unzipPublicFile('./cards.zip').then((file) => {
                  setAllCards(parseCSVToJSON(file) as Array<Card>)
                  setLoading(false)
              })
          } catch (error) {
              console.error('Fetch error:', error)
          }
      }

      if (allCards?.length === 0)
          fetchCardData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value: DataContextType = { allCards, setAllCards };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};