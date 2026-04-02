import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { LoadingContext, LoadingContextType } from '../../contexts/LoadingContext'
import './styles.css'

const Loading = () => {
    const { isLoading, loadingMessage } = useContext<LoadingContextType>(LoadingContext);

    return isLoading ? <div className='loading-wrapper'>
        <FontAwesomeIcon icon={faSpinner} spin={true} pulse={true} size='3x' />
        <p className='message'>{loadingMessage}</p>
    </div> : <></>
}

export default Loading
