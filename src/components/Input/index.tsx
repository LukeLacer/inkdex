import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import './styles.css'
import { getClass } from '../../utils'

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input = (props: InputProps) => {
    const { className, ...otherProps } = props

    return <input className={getClass(className, 'input-main')} {...otherProps} />
}

export default Input
