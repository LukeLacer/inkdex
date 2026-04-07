import React, { useContext, useState } from 'react'

import './styles.css'
import { Button, DeckCard } from '../../components';
import { DeckCard as CardWithQuantity } from '../../searchEngine/types';
import { findCards } from '../../searchEngine';
import { DataContext, DataContextType } from '../../contexts';

const Deckbuilder = () => {
    const { allCards } = useContext<DataContextType>(DataContext);
    const [decklist, setDecklist] = useState('');
    const [cardsToShow, setCardsToShow] = useState<Array<CardWithQuantity>>([])

    const confirmDecklist = () => {
        if (!allCards || allCards.length === 0) return
        if (!decklist) return

        setCardsToShow(findCards(allCards, decklist))
    }

    return (
        <div className='deckbuilder-wrapper'>
            <div className='deck-input-wrapper'>
                <p>Insira seu deck aqui</p>
                <textarea
                    value={decklist}
                    onChange={(e) => setDecklist(e.target.value)}
                />
                <Button onClick={confirmDecklist}>Confirmar lista</Button>
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
