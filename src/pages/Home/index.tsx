import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Button } from '../../components'
import { homeStrings } from '../../utils/strings'
import { parseCSVToJSON, unzipPublicFile } from '../../utils'
import { DataContext, DataContextType, LoadingContext, LoadingContextType } from '../../contexts'
import './styles.css'
import { Card } from '../..//searchEngine/types'

const Home = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const { setLoading } = useContext<LoadingContextType>(LoadingContext);
    const { setAllCards } = useContext<DataContextType>(DataContext);

    const navigate = useNavigate()


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

        fetchCardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clickSearchHandler = () => {
        navigate('result', {
            state: searchValue,
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickSearchHandler()
        }
    }

    return (
        <div className='home-wrapper'>
            <div className='search-wrapper'>
                <h1>{homeStrings.title}</h1>
                <p>{homeStrings.subtitle}</p>
                <Input
                    type='text'
                    autoFocus
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button onClick={() => clickSearchHandler()}>
                    {homeStrings.searchButtonLabel}
                </Button>
            </div>
        </div>
    )
}

export default Home
