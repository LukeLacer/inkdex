import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'
import { DropdownMenu, Button, ThemeChangeButton } from '../index'
import { headerStrings } from '../../utils'
import { ThemeContext, ThemeContextType } from '../../contexts'

const Header = () => {
    const navigate = useNavigate()
    const { toggleTheme } = useContext<ThemeContextType>(ThemeContext);

    const burgerItems = [
        <Button key='home' onClick={() => navigate('')}>{headerStrings.homeButton}</Button>,
        <Button key='deckbuilder' onClick={() => navigate('deckbuilder')}>{headerStrings.deckbuilderButton}</Button>,
        <Button key='mydecks' onClick={() => navigate('mydecks')}>{headerStrings.myDecksButton}</Button>
    ]

    const configurationItems = [
        <ThemeChangeButton key='themechange' onClick={() => toggleTheme()}/>
    ]

    return <div className='header-wrapper'>
        <div>
            <DropdownMenu dropdownMenuAlign='left' className='page-links-burger' items={burgerItems} />
            <div className='page-links-wrapper'>
                {burgerItems.map(el => el)}
            </div>
        </div>
        <DropdownMenu type='configuration' items={configurationItems} />
    </div>
}

export default Header
