import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import './styles.css'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = (props: ButtonProps) => {
    const { className, ...otherProps } = props
    return <button className={className + ' button-main'} {...otherProps} />
}

export default Button
