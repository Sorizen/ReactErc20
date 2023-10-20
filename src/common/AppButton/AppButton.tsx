import './AppButton.scss'

import { ButtonHTMLAttributes,HTMLProps, useMemo } from 'react'

type MODIFICATION = 'default' | 'border-rounded' | 'border-circle'
type SCHEME = 'default' | 'primary' | 'secondary'
type SIZE = 'default' | 'medium'

interface Props extends HTMLProps<HTMLButtonElement> {
    text?: string
    modification?: MODIFICATION,
    scheme?: SCHEME
    buttonSize?: SIZE
}

const AppButton = ({
    text = '',
    modification = 'default',
    scheme = 'default',
    buttonSize = 'default',
    ...params
}: Props) => {

    const buttonClasses = useMemo(() => {
        return [
            'app-button',
            `app-button--${modification}`,
            `app-button--${scheme}`,
            `app-button--${buttonSize}`,
        ].join(' ')
    }, [modification, scheme, buttonSize])

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
