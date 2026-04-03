import React from 'react'

import './styles.css'
import { Card as SingleCardProp } from '../../searchEngine/types'

type CardProps = {
    card: SingleCardProp
}

const Card = ({ card }: CardProps) => {
    const {
        Classifications,
        Cost,
        Image,
        Name,
        Rarity,
        Type,
    } = card
    return <div className='card-wrapper'>
        <img src={Image} alt={`${Name} card`} />
        <div className='right-wrapper'>
            <p>{Cost}</p>
            <p>{Name}</p>
            <p>{Type} {Classifications ? " - " : ''} {Classifications}</p>
            <p>{Rarity}</p>
        </div>
    </div>
}

export default Card
