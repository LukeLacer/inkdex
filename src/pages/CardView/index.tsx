import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { findCardByName } from '../../searchEngine';
import { Card } from '../../searchEngine/types';
import './styles.css'
import { DataContext, DataContextType } from '../../contexts';

const CardView = () => {
    const { allCards } = useContext<DataContextType>(DataContext);
    const [searchParams] = useSearchParams();
    const [card, setCard] = useState<Card>({} as Card)

    useEffect(() => {
        const card = searchParams.get("card")
        if (!card || !allCards || allCards.length === 0) return
        const cardToSee = findCardByName(allCards, card)
        if (!cardToSee) return
        setCard(cardToSee)
    }, [searchParams, allCards])

    return (
        <div className='card-view-wrapper'>
            <img src={card.Image} alt={`${card.Name} card`} />
            <div className='card-data-wrapper'>
                {
                    Object.entries(card).map(([key, value]) => {
                        if (key === 'Image') return null
                        return <p>{`${key}: ${value}`}</p>
                    })
                }
                {card.Name}
            </div>
        </div>
    )
}

export default CardView
