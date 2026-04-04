import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import './styles.css'
import { getClass } from '../../utils'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = (props: ButtonProps) => {
    const { className, ...otherProps } = props

    return <button className={getClass(className, 'button-main')} {...otherProps} />
}

export default Button
