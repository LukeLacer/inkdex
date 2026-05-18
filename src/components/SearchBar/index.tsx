import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import './styles.css'
import Input from '../Input'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type SearchBarProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & { onClickSearchButton: () => void }

const SearchBar = (props: SearchBarProps) => {
    const { className, type, autoFocus, onClickSearchButton, ...otherProps } = props

    return <div className='search-bar-wrapper'>
        <Input
            className={className + ' searchbar-main'}
            type='text'
            autoFocus
            {...otherProps}
        />
        <Button onClick={() => onClickSearchButton()}><FontAwesomeIcon icon={faMagnifyingGlass} className={'fa-lg'} /></Button>
    </div>
}

export default SearchBar
