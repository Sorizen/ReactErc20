import './ChooseProviderModal.scss'

import {
    PROVIDERS,
} from '@distributedlab/w3p'
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { AppButton, AppLoader,ErrorMessage, Modal } from '@/common'
import { ALLOWED_PROVIDERS } from '@/consts'
import { ProviderContext } from '@/context'
import { detectProviders, initProvider } from '@/helpers'
import { useAppDispatch } from "@/hooks";
import { cleanCurrentProvider,setCurrentProvider } from "@/store/slices/useProviderSlice.ts";
import { AllowedProvider } from '@/types'

interface Props extends HTMLAttributes<HTMLDivElement> {
    isShown: boolean
    updateIsShown: Dispatch<SetStateAction<boolean>>
    isCloseByClickOutside?: boolean
}
const ChooseProviderModal = ({ isShown, updateIsShown, isCloseByClickOutside, ...rest }: Props) => {
    const dispatch = useAppDispatch()
    const w3Provider = useContext(ProviderContext)

    const [activeProviders, setActiveProviders] =
        useState<AllowedProvider[]>([])
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
        setIsLoading(true)
        try {
            if(!w3Provider) { return }
            await initProvider(w3Provider, chosenProvider)
            dispatch(setCurrentProvider(chosenProvider))
        } catch (e) {
            dispatch(cleanCurrentProvider())
            setIsLoadFailed(true)
        }
        setIsLoading(false)
    }

    const connectProvider = async () => {
        setIsLoading(true)
        try {
            if(w3Provider?.provider && !w3Provider.address) {
                await w3Provider.connect()
                closeModal()
            }
        } catch (e) {
            dispatch(cleanCurrentProvider())
            setIsLoadFailed(true)
        }
        setIsLoading(false)
    }

    const closeModal = () => {
        updateIsShown(false)
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
            modalTitle="Connect your wallet"
            isCloseByClickOutside={isCloseByClickOutside}
            {...rest}
        >
            {
                isLoading
                    ? <AppLoader className="choose-provider-modal__status-message" />
                    : isLoadFailed
                        ? <ErrorMessage className="choose-provider-modal__status-message" />
                        : <div className="choose-provider-modal__inner">
                            <div className="choose-provider-modal__providers">
                                { activeProviders.map(provider =>
                                    (
                                        <AppButton
                                            className="choose-provider-modal__choose-button"
                                            key={provider.name}
                                            icon={provider.icon}
                                            onClick={
                                                () =>
                                                    initChosenProvider(
                                                        provider.name,
                                                    )
                                            }
                                        />
                                    )) }
                            </div>
                        </div>
            }
        </Modal>
    );
};

export default ChooseProviderModal;
