import React, { useEffect, useState } from 'react'

import './styles.css'
import { Deck } from '../../searchEngine/types';
import { getDecks } from '../../utils';
import { createSearchParams, useNavigate } from 'react-router-dom';

const MyDecks = () => {
    const [decksToShow, setDecksToShow] = useState<Array<Deck>>([])

    const navigate = useNavigate()

    useEffect(() => {
        setDecksToShow(getDecks())
    }, [])

    const deckClickHandler = (title: string, version: string) => {
        const params = { title, version };

        if (title && version)
            navigate({
                pathname: '/deckbuilder',
                search: `?${createSearchParams(params)}`,
            })
    }

    return (
        <div className='my-decks-wrapper'>
            {
                decksToShow.map((deck, index) => <div key={index} className='deck-data-wrapper' onClick={() => deckClickHandler(deck.title, deck.version)}>
                    <div className='title-label'>{deck.title}</div>
                    <div className='version-label'>versão: {deck.version}</div>
                </div>)
            }
        </div>
    )
}

export default MyDecks
