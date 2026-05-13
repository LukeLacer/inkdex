import React from 'react'

import './styles.css'
import { getClass } from '../../utils'

type TabItemProps = {
    className?: string,
    selected?: boolean,
    onClick: () => void,
    key: string,
    children: string
}

const TabItem = ({ className, selected, onClick, key, children }: TabItemProps) => {
    return <button
        className={`${getClass(className, 'tab-item-main')}${selected ? ' tab-selected' : ''}`}
        key={key}
        onClick={onClick}
    >
        {children}
    </button>
}

export default TabItem
