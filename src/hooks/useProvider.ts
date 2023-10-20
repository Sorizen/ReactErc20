import {
    Chain,
    ChainId,
    createProvider,
    CreateProviderOpts,
    IProvider,
    ProviderEventPayload,
    ProviderProxyConstructor,
    PROVIDERS,
    TransactionResponse,
    TxRequestBody,
} from '@distributedlab/w3p'
import { useCallback, useEffect, useState } from 'react'

const PROVIDER_EVENTS: Array<keyof IProvider> = [
    'onInitiated',
    'onConnect',
    'onAccountChanged',
    'onChainChanged',
    'onDisconnect',
]

export const useProvider = () => {
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [providerReactiveState, setProviderReactiveState] = useState(() => (
        {
            address: provider?.address,
            isConnected: provider?.isConnected,
            chainId: provider?.chainId,
            chainType: provider?.chainType,
            providerType: provider?.providerType,
        }
    ))

    const connect = async (): Promise<void> => provider?.connect?.()

    const addChain = async (chain: Chain): Promise<void> =>
        provider?.addChain?.(chain)

    const switchChain = async (chainId: ChainId): Promise<void> =>
        provider?.switchChain?.(chainId)

    const signAndSendTx = async (
        txRequestBody: TxRequestBody,
    ): Promise<TransactionResponse> =>
        provider?.signAndSendTx?.(txRequestBody) ?? ''

    const signMessage = async (message: string): Promise<string> =>
        provider?.signMessage?.(message) ?? ''

    const getHashFromTx = (txResponse: TransactionResponse): string =>
        provider?.getHashFromTx?.(txResponse) ?? ''

    const getTxUrl = (chain: Chain, txHash: string): string =>
        provider?.getTxUrl?.(chain, txHash) ?? ''

    const getAddressUrl = (chain: Chain, address: string): string =>
        provider?.getAddressUrl?.(chain, address) ?? ''

    const init = async (
        providerProxy: ProviderProxyConstructor,
        createProviderOpts?: CreateProviderOpts<PROVIDERS>,
    ) => {
        const initedProvider = await createProvider(
            providerProxy,
            createProviderOpts,
        )
        setProvider(initedProvider)
    }

    const setListeners = useCallback(() => {
        if (!provider) return
        PROVIDER_EVENTS.forEach(event => {
            const providerEvent = provider[event] as (
                // eslint-disable-next-line no-unused-vars
                cb: (payload: ProviderEventPayload) => void,
            ) => void

            providerEvent?.call(provider, payload => {
                setProviderReactiveState(prev => ({
                    ...prev,
                    ...payload,
                }))
            })
        })
    }, [provider])

    useEffect(() => {
        if(provider?.address) {
            provider?.clearHandlers()
            setListeners()

            setProviderReactiveState(prev => ({
                ...prev,
                address: provider?.address,
                isConnected: provider?.isConnected,
                chainId: provider?.chainId,
                chainType: provider?.chainType,
                providerType: provider?.providerType,
            }))
            return () => {
                provider?.clearHandlers()
            }
        }
    }, [provider, setListeners])

    return {
        provider,
        ...providerReactiveState,
        init,
        connect,
        addChain,
        switchChain,
        signMessage,
        signAndSendTx,
        getTxUrl,
        getHashFromTx,
        getAddressUrl,
    }
}
