import React, { useEffect, useState } from 'react'

import './styles.css'
import { Deck } from '../../searchEngine/types';
import { getDecks } from '../../utils';

const MyDecks = () => {
    const [decksToShow, setDecksToShow] = useState<Array<Deck>>([])

    useEffect(() => {
        setDecksToShow(getDecks())
    }, [])

    return (
        <div className='my-decks-wrapper'>
            {
                decksToShow.map((deck, index) => <div key={index}>
                    <p>{deck.title}</p>
                    <p>{deck.version}</p>
                    <p>{deck.description}</p>
                </div>)
            }
        </div>
    )
}

export default MyDecks
