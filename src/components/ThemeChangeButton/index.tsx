import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import './styles.css'
import { Button } from '../index'
import { changeTheme, getClass } from '../../utils'
import { ThemeContext, ThemeContextType } from '../../contexts'

const ThemeChangeButton = (props: any) => {
    const { theme } = useContext<ThemeContextType>(ThemeContext);
    const { className, ...otherProps } = props;

    return <Button {...otherProps} className={getClass(className, 'theme-change-button')}>
        {changeTheme}
        {
            theme === 'dark'
                ? <FontAwesomeIcon icon={faMoon} />
                : <FontAwesomeIcon icon={faSun} />
        }
    </Button>
}

export default ThemeChangeButton
