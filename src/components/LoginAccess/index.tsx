import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './styles.css'
import { DropdownMenu, Button } from '../index'
import { headerStrings } from '../../utils'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'

const LoginAccess = () => {
    const { isAuthenticated, authenticate, logout } = useContext<AuthContextType>(AuthContext);

    const logedUserItems = [
        <Button key='themechange' onClick={() => logout()}>Logout</Button>
    ]

    return <> {
        isAuthenticated
        ? <DropdownMenu type='loged' items={logedUserItems} />
        : <Button
            className='login-button'
            onClick={() => authenticate()}
        >
            <FontAwesomeIcon icon={faGoogle as IconProp} className='google-icon'/>
            {headerStrings.enterWithGoogle}
        </Button>
    } </>
}

export default LoginAccess
