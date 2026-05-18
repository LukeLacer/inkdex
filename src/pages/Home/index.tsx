import React, { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { SearchBar } from '../../components'
import { homeStrings } from '../../utils'

import './styles.css'

const Home = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const navigate = useNavigate()

    const clickSearchHandler = () => {
        const params = { query: searchValue };

        if (searchValue)
            navigate({
                pathname: '/result',
                search: `?${createSearchParams(params)}`,
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
                <div className='page-header-wrapper'>
                    <h1>{homeStrings.title}</h1>
                    <p>{homeStrings.subtitle}</p>
                </div>
                <SearchBar
                    className='homepage-searchbar'
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onClickSearchButton={() => clickSearchHandler()}
                />
            </div>
        </div>
    )
}

export default Home
