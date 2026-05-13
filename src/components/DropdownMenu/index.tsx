import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../index'
import './styles.css'
import { getClass } from '../../utils'

type DropdownMenuType = {
    className?: string;
    items: React.ReactElement[];
    type?: 'configuration';
    dropdownMenuAlign?: 'left' | 'right';
}

const DropdownMenu = ({ className, items, type, dropdownMenuAlign }: DropdownMenuType) => {
    const [isOpen, setIsOpen] = useState(false)

    const dropdownWrapper = useRef<HTMLDivElement>(null)

    const toggleDropdownMenu = () => setIsOpen(!isOpen)

    const closeDropdownMenuOnCLickOutside = (e: any)=>{
        if(isOpen && !dropdownWrapper.current?.contains(e.target)){
            setIsOpen(false)
        }
    }

    document.addEventListener('mousedown', closeDropdownMenuOnCLickOutside)

    return <div className={getClass(className, 'dropdown-wrapper')} ref={dropdownWrapper}>
        <Button onClick={() => toggleDropdownMenu()} className='dropdown-button'>
            <FontAwesomeIcon icon={type === 'configuration' ? faGear : faBars} />
        </Button>
        {
            isOpen
                ? <div className='dropdown-menu' style={dropdownMenuAlign === 'left' ? {left: 0}: {right: 0} }>
                    {items.map(el => {
                        return React.cloneElement(el, {
                            onClick: (e: any) => {
                                el.props.onClick?.(e);
                                setIsOpen(false);
                            }
                        });
                    })}
                </div>
                : null
        }
    </div>
}

export default DropdownMenu
