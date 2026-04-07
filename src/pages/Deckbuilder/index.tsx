import React, { useContext, useEffect, useState } from 'react'

import './styles.css'
import { Button, Input } from '../../components';
import { DataContext, DataContextType } from '../../contexts';
import { saveDeck, getDeckByTitleVersion } from '../../utils';
import { useSearchParams } from 'react-router-dom';
import { deckCheck } from '../../searchEngine';
import { deckBuilderStrings } from '../../utils/strings';

const Deckbuilder = () => {
    const [searchParams] = useSearchParams();
    const { allCards } = useContext<DataContextType>(DataContext);
    const [decklist, setDecklist] = useState('');
    const [maybeboard, setMaybeboard] = useState('');
    const [title, setTitle] = useState<string>('')
    const [version, setVersion] = useState<string>(deckBuilderStrings.initialVersion)
    const [description, setDescription] = useState<string>('')
    const [pageTitle, setPageTitle] = useState(deckBuilderStrings.defaultPageTitle)
    const [edit, setEdit] = useState<boolean>(false)

    useEffect(() => {
        const title = searchParams.get("title")
        const version = searchParams.get("version")

        if (!title || !version) return
        
        const deck = getDeckByTitleVersion(title, version)

        if (!deck) return

        setVersion(deck.version)
        setTitle(deck.title)
        setDescription(deck.description)
        setDecklist(deck.decklist)
        setMaybeboard(deck.maybeboard)
        setPageTitle(deckBuilderStrings.editPageTitle)
        setEdit(true)
    }, [searchParams])

    const confirmDecklist = () => {
        if (!allCards || allCards.length === 0) return
        if (!decklist) return

        const deckDefinitions = deckCheck(allCards, decklist)

        if (deckDefinitions.deckHasError) return

        saveDeck({
            title: title.trim(),
            version: version.trim(),
            description: description.trim(),
            decklist: decklist.trim(),
            maybeboard: maybeboard.trim()
        }, edit)
    }

    return (
        <div className='deckbuilder-wrapper'>
            <h1>{pageTitle}</h1>
            <div className='input-version-wrapper'>
                <p>{deckBuilderStrings.version}</p>
                <Input
                    type='text'
                    value={version}
                    id='deck-version'
                    onChange={(e) => setVersion(e.target.value)}
                />
            </div>
            <div className='input-label-value-wrapper'>
                <p>{deckBuilderStrings.name}</p>
                <Input
                    type='text'
                    autoFocus
                    value={title}
                    id='deck-title'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='input-label-value-wrapper'>
                <p>{deckBuilderStrings.description}</p>
                <textarea
                    className='description-text-area'
                    value={description}
                    id='deck-description'
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='input-label-value-wrapper'>
                <p>{deckBuilderStrings.decklist}</p>
                <textarea
                    value={decklist}
                    id='decklist'
                    onChange={(e) => setDecklist(e.target.value)}
                />
            </div>
            <div className='input-label-value-wrapper'>
                <p>{deckBuilderStrings.maybeboard}</p>
                <textarea
                    value={maybeboard}
                    id='maybeboard'
                    onChange={(e) => setMaybeboard(e.target.value)}
                />
            </div>
            <Button onClick={confirmDecklist}>{deckBuilderStrings.saveDeckButton}</Button>
        </div>
    )
}

export default Deckbuilder
