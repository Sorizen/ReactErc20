import './InputField.scss'

import { Dispatch, FormEvent, HTMLProps, SetStateAction, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

type SCHEME = 'default' | 'primary'

interface Props extends HTMLProps<HTMLInputElement> {
    value: string
    scheme?: SCHEME
    inputHandler?: Dispatch<SetStateAction<string>>
}

const InputField = (
    {
        scheme = 'default',
        value,
        onInput,
        onChange,
        inputHandler,
        ...params
    }: Props) => {
    const uid = uuidv4()

    const inputClasses = useMemo(() => [
        'input-field',
        `input-field--${scheme}`,
    ].join(' '), [scheme])

    const handleInput = (e: FormEvent<HTMLInputElement> ) => {
        const { value: eventValue } = e.target as HTMLInputElement
        if(eventValue === value) { return }

        if (inputHandler) {
            inputHandler(eventValue)
        }

        if (onInput) {
           onInput(e)
        }

        if(onChange) {
            onChange(e)
        }
    }

    return (
        <div className={inputClasses}>
            <div className="input-field__wrapper">
                <input
                    className="input-field__input"
                    id={`input-field--${uid}`}
                    value={value}
                    onInput={handleInput}
                    { ...params as HTMLProps<HTMLInputElement> }
                />
            </div>
        </div>
    );
};

export default InputField;
