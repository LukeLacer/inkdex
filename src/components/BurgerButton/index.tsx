import React, { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import './styles.css'
import { Button } from '../index'
import { burgerMenuStrings } from '../../utils'
import { ThemeContext, ThemeContextType } from '../../contexts'

const BurgerMenu = () => {
    const { theme, toggleTheme } = useContext<ThemeContextType>(ThemeContext);
    const [isOpen, setIsOpen] = useState(false)

    const burgerWrapper = useRef<HTMLDivElement>(null)

    const toggleBurgerMenu = () => setIsOpen(!isOpen)

    const themeChangeHandler = () => {
        toggleBurgerMenu()
        toggleTheme()
    }

    const closeBurgerMenuOnCLickOutside = (e: any)=>{
        if(isOpen && !burgerWrapper.current?.contains(e.target)){
            setIsOpen(false)
        }
    }

    document.addEventListener('mousedown', closeBurgerMenuOnCLickOutside)

    return <div className='burger-wrapper' ref={burgerWrapper}>
        <Button onClick={() => toggleBurgerMenu()} className='burger-button'>
            <FontAwesomeIcon icon={faBars} />
        </Button>
        {
            isOpen
                ? <div className='burger-menu'>
                    <div className='burger-menu-item' onClick={() => themeChangeHandler()}>
                        {burgerMenuStrings.changeTheme}
                        {
                            theme === 'dark'
                                ? <FontAwesomeIcon icon={faMoon} />
                                : <FontAwesomeIcon icon={faSun} />
                        }
                    </div>
                </div>
                : null
        }
    </div>
}

export default BurgerMenu
