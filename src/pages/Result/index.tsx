import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Card, Input } from '../../components'

import './styles.css'
import { CardType } from '../../types'
import { cardService } from '../../services'
import { LoadingContext, LoadingContextType } from '../../contexts'

const Result = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchResults, setSearchResults] = useState<CardType[]>([])
    const [inputSearchValue, setInputSearchValue] = useState<string>('')
    const [valueToSearch, setValueToSearch] = useState<string>('')

    const { setLoading } = useContext<LoadingContextType>(LoadingContext);

    useEffect(() => {
        if (!valueToSearch) return
        setLoading(true)
        cardService.getCardsBySearchValue(valueToSearch).then((res) => {
            setSearchResults(res)
            setLoading(false)
        })
    }, [valueToSearch])

    useEffect(() => {
        const query = searchParams.get('query')
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

    const cardsToShow = () => (
        <>
            {searchResults?.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </>
    )

    return (
        <div className="result-wrapper">
            <Input
                type="text"
                autoFocus
                value={inputSearchValue}
                onChange={(e) => setInputSearchValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="cards-wrapper">{cardsToShow()}</div>
        </div>
    )
}

export default Result
