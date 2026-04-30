import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import './styles.css'
import { getDeckByTitleVersion, deckViewerStrings } from '../../utils';
import { Button } from '../../components';

const Deckviewer = () => {
    const [searchParams] = useSearchParams();
    const [decklist, setDecklist] = useState('');
    const [maybeboard, setMaybeboard] = useState('');
    const [title, setTitle] = useState<string>('')
    const [version, setVersion] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [viewMode] = useState<string>('list')
    const navigate = useNavigate()

    useEffect(() => {
        const title = searchParams.get("title")
        const version = searchParams.get("version")

        if (!title || !version) {
            return
        }
        
        const deck = getDeckByTitleVersion(title, version)

        if (!deck) return

        setVersion(deck.version)
        setTitle(deck.title)
        setDescription(deck.description)
        setDecklist(deck.decklist)
        setMaybeboard(deck.maybeboard)
    }, [searchParams])

    const editDeckHandler = (title: string, version: string) => {
        const params = { title, version };

        if (title && version)
            navigate({
                pathname: '/deckbuilder',
                search: `?${createSearchParams(params)}`,
            })
    }

    const cardsView = (list: string) => {
        switch (viewMode) {
            case 'list':
                return <pre>{list}</pre>
        }
    }

    return (
        <div className='deckviewer-wrapper'>
            <h1>{title}</h1>
            <h2>{deckViewerStrings.version}{version}</h2>
            <div>
                {deckViewerStrings.description}
                <pre>{description}</pre>
            </div>
            <div>
                {deckViewerStrings.decklist}
                {cardsView(decklist)}
            </div>
            <div>
                {deckViewerStrings.maybeboard}
                {cardsView(maybeboard)}
            </div>
            <Button onClick={() => editDeckHandler(title, version)}>
                {deckViewerStrings.editPageButton}
            </Button>
        </div>
    )
}

export default Deckviewer
