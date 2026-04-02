import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Button } from '../../components'
import { homeStrings } from '../../utils/strings'
import './styles.css'

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
