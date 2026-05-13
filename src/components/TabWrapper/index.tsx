import React, { ReactNode } from 'react'

import './styles.css'

type TabWrapperProps = {
    children: ReactNode
}

const TabWrapper = ({ children }: TabWrapperProps) => {
    return <div className='tab-wrapper'>
        {children}
    </div>
}

export default TabWrapper
