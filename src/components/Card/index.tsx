import { createSearchParams, useNavigate } from 'react-router-dom'
import { CardType } from '../../types'

import './styles.css'

type CardProps = {
    card: CardType
}

const Card = ({ card }: CardProps) => {
    const {
        classifications,
        cost,
        image_uris,
        name,
        rarity,
        type,
    } = card

    const navigate = useNavigate()

    const clickCardHadler = () => {
        if (card)
            navigate({
                pathname: '/card-vew',
                search: `?${createSearchParams({ set: card.set.code, number: card.collector_number })}`,
            })
    }

    return <div className='card-wrapper' onClick={() => clickCardHadler()}>
        <img src={image_uris.digital.small} alt={`${name} card`} />
        <div className='right-wrapper'>
            <p>{cost}</p>
            <p>{name}</p>
            <p>{type} {classifications ? " - " : ''} {classifications}</p>
            <p>{rarity}</p>
        </div>
    </div>
}

export default Card
