import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './styles.css'
import { find } from '../../searchEngine'
import { DataContext, DataContextType } from '../../contexts'
import { Card as CardProps } from '../../searchEngine/types'
import { Card, Input } from '../../components'

const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<CardProps[]|undefined>([])
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [valueToSearch, setValueToSearch] = useState<string>('');
    const { allCards } = useContext<DataContextType>(DataContext);

    useEffect(() => {
        if (!allCards || !valueToSearch) return
        setSearchParams({ query: valueToSearch})
        setSearchResults(find(allCards, valueToSearch))
    }, [allCards, valueToSearch, setSearchParams])

    useEffect(() => {
        const query = searchParams.get("query")
        if (!query) return
        setInputSearchValue(query)
        setValueToSearch(query)
    }, [searchParams])

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
                value={inputSearchValue}
                onChange={(e) => setInputSearchValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className='cards-wrapper'>
                {cardsToShow()}
            </div>
        </div>
    )
}

export default Result
