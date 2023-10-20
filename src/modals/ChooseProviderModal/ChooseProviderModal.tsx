import './ChooseProviderModal.scss'

import {
    PROVIDERS,
} from '@distributedlab/w3p'
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { AppButton, Modal } from '@/common'
import { ALLOWED_PROVIDERS } from '@/consts'
import { ProviderContext } from '@/context'
import { detectProviders, initProvider } from '@/helpers'
import { useAppDispatch } from "@/hooks";
import { cleanCurrentProvider,setCurrentProvider } from "@/store/slices/useProviderSlice.ts";
import { AllowedProvider } from '@/types'

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShown: boolean
    updateIsShown: Dispatch<SetStateAction<boolean>>
    onSubmit: () => Promise<void>,
    isCloseByClickOutside?: boolean
}
const ChooseProviderModal = ({ isShown, updateIsShown, isCloseByClickOutside, ...rest }: Props) => {
    const dispatch = useAppDispatch()
    const w3Provider = useContext(ProviderContext)

    const [activeProviders, setActiveProviders] = useState<AllowedProvider[]>([])
    const [isLoadFailed, setIsLoadFailed] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const detectExistedProviders = useCallback(async () => {
        setIsLoading(true)
        try {
            const { foundProviders } = await detectProviders()
            const providersToConnect =
                ALLOWED_PROVIDERS.filter(
                    ({ name }) =>
                        Object.keys(foundProviders)
                            .some(
                                foundProviderName => foundProviderName === name,
                            ),
                )
            if(providersToConnect) {
                setActiveProviders(providersToConnect)
            }
        } catch (e) {
            setIsLoadFailed(true)
        }
        setIsLoading(false)
    }, [])

    const initChosenProvider = async (chosenProvider: PROVIDERS) => {
        try {
            if(!w3Provider) { return }
            await initProvider(w3Provider, chosenProvider)
            dispatch(setCurrentProvider(chosenProvider))
        } catch (e) {
            dispatch(cleanCurrentProvider())
        }
    }

    const connectProvider = async () => {
        try {
            if(w3Provider?.provider && !w3Provider.address) {
                await w3Provider.connect()
            }
        } catch (e) {
            dispatch(cleanCurrentProvider())
        }
    }

    useEffect(() => {
        detectExistedProviders()
    }, [detectExistedProviders])

    useEffect(() => {
        if(w3Provider?.provider && !w3Provider.address) {
            connectProvider()
        }
    }, [w3Provider?.provider]);

    return (
        <Modal
            isShown={isShown}
            updateIsShown={updateIsShown}
            isCloseButton
            isCloseByClickOutside={isCloseByClickOutside}
            {...rest}
        >
            <div className="choose-provider-modal__inner">
                <div className="choose-provider-modal__providers">
                    { activeProviders.map(provider => {
                        return (
                            <AppButton
                                className="choose-provider-modal__choose-button"
                                key={provider.name}
                                icon={provider.icon}
                                onClick={
                                    () => initChosenProvider(provider.name)
                                }
                            />
                        )
                    }) }
                </div>
            </div>
        </Modal>
    );
};

export default ChooseProviderModal;
