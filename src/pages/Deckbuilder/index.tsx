import React, { useContext, useState } from 'react'

import './styles.css'
import { Button, DeckCard, Input } from '../../components';
import { DeckCard as CardWithQuantity } from '../../searchEngine/types';
import { findCards } from '../../searchEngine';
import { DataContext, DataContextType } from '../../contexts';
import { saveDeck } from '../../utils';

const Deckbuilder = () => {
    const { allCards } = useContext<DataContextType>(DataContext);
    const [decklist, setDecklist] = useState('');
    const [maybeboard, setMaybeboard] = useState('');
    const [cardsToShow, setCardsToShow] = useState<Array<CardWithQuantity>>([])
    const [title, setTitle] = useState<string>('')
    const [version, setVersion] = useState<string>('1.0.0')
    const [description, setDescription] = useState<string>('')

    const confirmDecklist = () => {
        if (!allCards || allCards.length === 0) return
        if (!decklist) return

        setCardsToShow(findCards(allCards, decklist))

        saveDeck({
            title: title.trim(),
            version: version.trim(),
            description: description.trim(),
            decklist: decklist.trim(),
            maybeboard: maybeboard.trim()
        })
    }

    return (
        <div className='deckbuilder-wrapper'>
            <div className='deck-input-wrapper'>
                <h1>Criar novo deck</h1>
                <div className='input-version-wrapper'>
                    <p>Versão</p>
                    <Input
                        type='text'
                        value={version}
                        id='deck-version'
                        onChange={(e) => setVersion(e.target.value)}
                    />
                </div>
                <div className='input-label-value-wrapper'>
                    <p>Nome</p>
                    <Input
                        type='text'
                        autoFocus
                        value={title}
                        id='deck-title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='input-label-value-wrapper'>
                    <p>Descrição</p>
                    <textarea
                        className='description-text-area'
                        value={description}
                        id='deck-description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='input-label-value-wrapper'>
                    <p>Lista do deck (decklist)</p>
                    <textarea
                        value={decklist}
                        id='decklist'
                        onChange={(e) => setDecklist(e.target.value)}
                    />
                </div>
                <div className='input-label-value-wrapper'>
                    <p>Lista de possibilidades (maybeboard)</p>
                    <textarea
                        value={maybeboard}
                        id='maybeboard'
                        onChange={(e) => setMaybeboard(e.target.value)}
                    />
                </div>
                <Button onClick={confirmDecklist}>Salvar deck</Button>
            </div>
            <div className='deck-viewer-wrapper'>
                {
                    cardsToShow.map((card, index) => <DeckCard key={index} card={card} />)
                }
            </div>
        </div>
    )
}

export default Deckbuilder
