import './Modal.scss'

import { Dispatch, HTMLAttributes, SetStateAction, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'
import { useClickAway } from 'react-use'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

const MODAL_ANIMATION_TIMEOUT = 500 //ms

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShown: boolean
    updateIsShown: Dispatch<SetStateAction<boolean>>
    isCloseByClickOutside?: boolean
    isCloseButton?: boolean
    modalTitle?: string
}

const modalRoot = document.getElementById('modal') as HTMLElement

const Modal = (
    {
        isShown,
        updateIsShown,
        children,
        className,
        isCloseButton = false,
        modalTitle = '',
        isCloseByClickOutside = true,
        ...rest
    }: Props,
) => {
    const modalPaneRef = useRef(null)

    const modalPaneClasses = useMemo(() => [
        'modal__pane',
        ...[isCloseButton || modalTitle ? 'modal__pane--top-padding' : []],
    ].join(' '), [isCloseButton])

    useClickAway(modalPaneRef, () => {
        if (isCloseByClickOutside) {
            updateIsShown(false)
        }
    })

    return createPortal(
            (
                <Transition
                    unmountOnExit
                    mountOnEnter
                    in={isShown}
                    timeout={MODAL_ANIMATION_TIMEOUT}
                >
                    {
                        state => (
                            <div
                                className={`modal ${className ?? ''} modal--${state}`}
                                {...rest}
                            >
                                <div
                                    ref={modalPaneRef}
                                    className={modalPaneClasses}
                                >
                                    {
                                        modalTitle &&
                                        <h3
                                            className="modal__title"
                                        >
                                            { modalTitle }
                                        </h3>
                                    }
                                    {
                                        isCloseButton &&
                                        <AppButton
                                            className="modal__close-button"
                                            icon={ICON_NAMES.x}
                                            onClick={() => updateIsShown(false)}
                                        />
                                    }
                                    { children }
                                </div>
                            </div>
                        )
                    }
                </Transition>
            ),
        modalRoot,
    )
}

export default Modal
