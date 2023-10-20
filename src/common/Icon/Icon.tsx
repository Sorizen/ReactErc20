import './Icon.scss'

import { HTMLAttributes  } from 'react'

import { ICON_NAMES } from '@/enums'

interface IconProps extends HTMLAttributes<SVGElement> {
    name: ICON_NAMES
}

const Icon = ({ name, className = '', ...rest }: IconProps) => {
    return (
        <svg className={`icon ${className}`} aria-hidden='true'>
            <use href={`#${name}-icon`} {...rest} />
        </svg>
    )
}

export default Icon
