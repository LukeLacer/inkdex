import React from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'
import Button from '../Button'

const Header = () => {
    const navigate = useNavigate()

    const goHomeHandler = () => {
        navigate('')
    }
    return <div className='header-wrapper'>
        <Button onClick={() => goHomeHandler()}>Home</Button>
    </div>
}

export default Header
