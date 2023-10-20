import './ErrorMessage.scss'

import { HTMLAttributes, useMemo } from "react";

import { Icon } from '@/common'
import { ICON_NAMES } from "@/enums";

interface Props extends HTMLAttributes<HTMLDivElement> {
    message?: string,
    title?: string,
}

const ErrorMessage = ({ message, title, className, ...params }: Props) => {

    const classNames = useMemo(() => [
        'error-message',
        ...[className ?? []],
    ].join(' '), [className])

    return (
        <div className={classNames} {...params}>
            <Icon name={ICON_NAMES.exclamationCircle} />
            {
                title && <h3 className="error-message__title">
                    { title }
                </h3>
            }
            <span className="error-message__text">
                { message ?? 'Something bad happened.' }
            </span>
        </div>
    );
};

export default ErrorMessage;
