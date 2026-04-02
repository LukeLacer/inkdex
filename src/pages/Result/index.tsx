import React from 'react'
import { useLocation } from 'react-router-dom'

const Result = () => {
    const searchString: string = useLocation().state

    return (
        <div>
            <p>results for: {searchString}</p>
            <pre>{searchString}</pre>
        </div>
    )
}

export default Result
