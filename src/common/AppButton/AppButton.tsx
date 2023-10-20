import './AppButton.scss'

import { ButtonHTMLAttributes,HTMLProps, useMemo } from 'react'

import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

type MODIFICATION = 'default' | 'border-rounded' | 'border-circle'
type SCHEME = 'default' | 'primary' | 'secondary'
type SIZE = 'default' | 'medium'

interface Props extends HTMLProps<HTMLButtonElement> {
    text?: string
    modification?: MODIFICATION,
    scheme?: SCHEME
    buttonSize?: SIZE
    iconRight?: ICON_NAMES
    iconLeft?: ICON_NAMES
    icon?: ICON_NAMES
}

const AppButton = ({
    text = '',
    modification = 'default',
    scheme = 'default',
    buttonSize = 'default',
    iconLeft = undefined,
    iconRight = undefined,
    icon = undefined,
    ...params
}: Props) => {

    const buttonClasses = useMemo(() => {
        return [
            'app-button',
            `app-button--${modification}`,
            `app-button--${scheme}`,
            `app-button--${buttonSize}`,
            ...[iconLeft ? 'app-button--icon-left' : []],
            ...[iconRight ? 'app-button--icon-right' : []],
        ].join(' ')
    }, [modification, scheme, buttonSize])

    return (
        <button
            className={buttonClasses}
            {...params as ButtonHTMLAttributes<HTMLButtonElement> }
        >
            {
                icon
                    ? <Icon className="app-button__icon" name={icon} />
                    : <>
                        {
                            iconLeft && <Icon className="app-button__icon app-button__icon--left" name={iconLeft} />
                        }
                        { params.children ?? text }
                        {
                            iconRight && <Icon className="app-button__icon app-button__icon--right"  name={iconRight} />
                        }
                    </>
            }
        </button>
    )
}

export default AppButton;
