import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {
    const searchString: string = useLocation().state
    const [searchResults, setSearchResults] = useState<string[]>([])

    useEffect(() => {
        setSearchResults([searchString])
    }, [searchString])

    return (
        <div>
            <h1>results for: {searchString}</h1>
            {searchResults}
        </div>
    )
}

export default Result
