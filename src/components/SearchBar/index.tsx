import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import './styles.css'
import Input from '../Input'

type SearchBarProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const SearchBar = (props: SearchBarProps) => {
    const { className, type, autoFocus, ...otherProps } = props

    return <Input
        className={className + ' searchbar-main'}
        type='text'
        autoFocus
        {...otherProps}
    />
}

export default SearchBar
