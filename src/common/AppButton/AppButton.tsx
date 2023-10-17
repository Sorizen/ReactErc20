import './AppButton.scss'

import { ButtonHTMLAttributes,HTMLProps, useMemo } from 'react'

type MODIFICATION = 'default' | 'border-rounded' | 'border-circle'
type COLOR = 'default' | 'primary' | 'secondary'
type SIZE = 'default' | 'medium'

interface Props extends HTMLProps<HTMLButtonElement> {
    text?: string
    modification?: MODIFICATION,
    color?: COLOR
    buttonSize?: SIZE
}

const AppButton = ({
    text = '',
    modification = 'default',
    color = 'default',
    buttonSize = 'default',
    ...params
}: Props) => {

    const buttonClasses = useMemo(() => {
        return [
            'app-button',
            `app-button--${modification}`,
            `app-button--${color}`,
            `app-button--${buttonSize}`,
        ].join(' ')
    }, [modification, color, buttonSize])

    return (
        <button
            className={buttonClasses}
            {...params as ButtonHTMLAttributes<HTMLButtonElement> }
        >
            { params.children ?? text }
        </button>
    )
}

export default AppButton;
