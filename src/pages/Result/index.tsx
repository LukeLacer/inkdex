import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './styles.css'
import { find } from '../../searchEngine'
import { DataContext, DataContextType } from '../../contexts'
import { Card as CardProps } from '../../searchEngine/types'
import { Card, Input } from '../../components'

const Result = () => {
    const searchString: string = useLocation().state
    const [searchResults, setSearchResults] = useState<CardProps[]|undefined>([])
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [valueToSearch, setValueToSearch] = useState<string>('');
    const { allCards } = useContext<DataContextType>(DataContext);

    useEffect(() => {
        if (!allCards || !valueToSearch) return
        setSearchResults(find(allCards, valueToSearch))
    }, [allCards, valueToSearch])

    useEffect(() => {
      setInputSearchValue(searchString)
      setValueToSearch(searchString)
    }, [searchString])

    const clickSearchHandler = () => {
        setValueToSearch(inputSearchValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickSearchHandler()
        }
    }

    const cardsToShow = () => <>
        { searchResults?.map((card, index) => <Card key={index} card={card} />) }
    </>

    return (
        <div className='result-wrapper'>
            <Input
                type='text'
                autoFocus
                onChange={(e) => setInputSearchValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <h1>results for: {searchString}</h1>
            <div className='cards-wrapper'>
                {cardsToShow()}
            </div>
        </div>
    )
}

export default Result
