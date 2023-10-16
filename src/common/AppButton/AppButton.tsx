import React, { useMemo } from 'react'
import './AppButton.scss'

type MODIFICATION = 'default' | 'border-rounded' | 'border-circle'
type COLOR = 'default' | 'primary' | 'secondary'
type SIZE = 'default' | 'medium'

interface Props extends React.HTMLProps<HTMLButtonElement> {
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
            `app-button--${buttonSize}`
        ].join(' ')
    }, [modification, color, buttonSize])

    return (
        <button
            className={buttonClasses}
            {...params as React.ButtonHTMLAttributes<HTMLButtonElement> }
        >
            { params.children ?? text }
        </button>
    )
}

export default AppButton;
