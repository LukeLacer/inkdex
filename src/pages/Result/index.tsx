import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { find } from '../../searchEngine'
import { DataContext, DataContextType } from '../../contexts'
import { Card } from '../../searchEngine/types'

const Result = () => {
    const searchString: string = useLocation().state
    const [searchResults, setSearchResults] = useState<Card[]|undefined>([])
    const { allCards } = useContext<DataContextType>(DataContext);

    useEffect(() => {
        setSearchResults(find(allCards!, searchString))
    }, [allCards, searchString])

    return (
        <div>
            <h1>results for: {searchString}</h1>
            {JSON.stringify(searchResults, null, 4)}
        </div>
    )
}

export default Result
