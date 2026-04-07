import React from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'
import { BurgerMenu, Button } from '../index'
import { headerStrings } from '../../utils'

const Header = () => {
    const navigate = useNavigate()

    const goHomeHandler = () => {
        navigate('')
    }

    const deckbuilderHandler = () => {
        navigate('deckbuilder')
    }

    const myDecksHandler = () => {
        navigate('mydecks')
    }

    return <div className='header-wrapper'>
        <div className='page-links-wrapper'>
            <Button onClick={() => goHomeHandler()}>{headerStrings.homeButton}</Button>
            <Button onClick={() => deckbuilderHandler()}>{headerStrings.deckbuilderButton}</Button>
            <Button onClick={() => myDecksHandler()}>{headerStrings.myDecksButton}</Button>
        </div>
        <BurgerMenu />
    </div>
}

export default Header
