import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './styles.css'
import { CardType } from '../../types';
import { cardService } from '../../services';
import { LoadingContext, LoadingContextType } from '../../contexts';

const CardView = () => {
    const [searchParams] = useSearchParams();
    const [card, setCard] = useState<CardType>()
    const { setLoading } = useContext<LoadingContextType>(LoadingContext);

    useEffect(() => {
        setLoading(true)
        const set = searchParams.get("set")
        const number = searchParams.get("number")
        if (!set || !number) return
        cardService.getCardBySetAndNumber(set, number).then((res) => {
            setCard(res)
            setLoading(false)
        })
    }, [])

    return (
        card
            ? <div className='card-view-wrapper'>
                <img src={card?.image_uris?.digital?.large} alt={`${card?.name} card`} />
                <div className='card-data-wrapper'>
                    {
                        Object.entries(card).map(([key, value]) => {
                            if (key === 'Image') return null
                            return <p key={key}>{`${key}: ${value}`}</p>
                        })
                    }
                    {card?.name}
                </div>
            </div>
            : <></>
    )
}

export default CardView
