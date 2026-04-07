import React from 'react'

import './styles.css'
import { DeckCard as DeckCardObj } from '../../searchEngine/types'

type DeckCardProps = {
    card: DeckCardObj
}

const DeckCard = ({ card }: DeckCardProps) => {
    const {
        Image,
        Name
    } = card.card

    return <div className='single-card-wrapper'>
        <div className='card-quantity'>{card.quantity}</div>
        <img className='card-image' src={Image} alt={`${Name} card`} />
    </div>
}

export default DeckCard
