import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './styles.css'
import { find } from '../../searchEngine'
import { DataContext, DataContextType } from '../../contexts'
import { Card as CardProps } from '../../searchEngine/types'
import { Card } from '../../components'

const Result = () => {
    const searchString: string = useLocation().state
    const [searchResults, setSearchResults] = useState<CardProps[]|undefined>([])
    const { allCards } = useContext<DataContextType>(DataContext);

    useEffect(() => {
        if (!allCards || !searchString) return
        setSearchResults(find(allCards, searchString))
    }, [allCards, searchString])

    const cardsToShow = () => <>
        { searchResults?.map((card, index) => <Card card={card} />) }
    </>

    return (
        <div className='result-wrapper'>
            <h1>results for: {searchString}</h1>
            <div className='cards-wrapper'>
                {cardsToShow()}
            </div>
        </div>
    )
}

export default Result
