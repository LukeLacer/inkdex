import React from 'react'

import './styles.css'
import { Card as SingleCardProp } from '../../searchEngine/types'
import { createSearchParams, useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    const clickCardHadler = () => {
        if (card)
            navigate({
                pathname: '/card-vew',
                search: `?${createSearchParams({ card: card.Name })}`,
            })
    }

    return <div className='card-wrapper' onClick={() => clickCardHadler()}>
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
