import React, { useContext, useEffect, useState } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'

import './styles.css'
import { CardType } from '../../types';
import { cardService } from '../../services';
import { LoadingContext, LoadingContextType } from '../../contexts';
import { formatBrlCurrency, formatUsdCurrency } from '../../utils';

const CardView = () => {
    const [searchParams] = useSearchParams()
    const [card, setCard] = useState<CardType>()
    const [cardBasicParams, setCardBasicParams] = useState('');
    const { setLoading } = useContext<LoadingContextType>(LoadingContext);

    useEffect(() => {
        setLoading(true)
        const set = searchParams.get("set")
        const number = searchParams.get("number")
        if (!set || !number) return
        cardService.getCardBySetAndNumber(set, number).then((res) => {
            setCard(res)
            const params = {
                view: 'cards/search',
                card: `${res?.name}${res?.version ? ' - ' : ''}${res?.version}`
            }
            setCardBasicParams(`https://www.ligalorcana.com.br/?${createSearchParams(params)}`)
            setLoading(false)
        })
    }, [])

    return (
        card
            ? <div className='card-view-wrapper'>
                <img src={card?.image_uris?.digital?.large} alt={`${card?.name} card`} />
                <div className='card-data-wrapper'>
                    {`${card?.name}${card?.version ? ' - ' : ''}${card?.version}`}
                    <pre>{card.text}</pre>
                    <p>{`${card.set.code} - ${card.set.name}`}</p>
                    <p style={{display: 'flex'}}><img style={{maxHeight: '1rem', marginRight: '12px'}} src={`../img/symbols/rarity-${card.rarity.replace('_', '').toLowerCase()}.png`} />{card.rarity.replace('_', ' ')}</p>
                    <div>{
                        Object.entries(card.prices).map(([key, value]) => {
                            return <pre key={key}>{`(TCGPlayer) ${key.includes('foil') ? 'foil' : 'normal'}: ${formatUsdCurrency(value!)}`}</pre>
                        })
                    }</div>
                    <a href={cardBasicParams} target='_blank'>Busque por essa carta na Liga</a>
                </div>
            </div>
            : <></>
    )
}

export default CardView
