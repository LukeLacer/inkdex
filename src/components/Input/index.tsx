import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import './styles.css'

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input = (props: InputProps) => {
    const { className, ...otherProps } = props
    return <input className={className + ' input-main'} {...otherProps} />
}

export default Input
