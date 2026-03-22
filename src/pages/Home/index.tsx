import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'

import { Input, Button } from '../../components'

const Home = () => {
    const [searchValue, setSearchValue] = useState<string>('')

    const navigate = useNavigate()

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
                <h1>Inkdex</h1>
                <p>
                    Welcome to the home page! This website is a deckbuilder, card
                    searcher and more for your Lorcana TCG game.
                </p>
                <Input
                    type='text'
                    autoFocus
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button onClick={() => clickSearchHandler()}>
                    Buscar
                </Button>
            </div>
        </div>
    )
}

export default Home
