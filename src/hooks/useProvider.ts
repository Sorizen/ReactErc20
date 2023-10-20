import {
    Chain,
    ChainId,
    createProvider,
    IProvider,
    ProviderDetector,
    ProviderListeners,
    ProviderProxyConstructor,
    PROVIDERS,
    TransactionResponse,
    TxRequestBody,
} from '@distributedlab/w3p'
import { useEffect, useState } from 'react'

export const useProvider = () => {
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [providerReactiveState, setProviderReactiveState] = useState(() => (
        {
            address: provider?.address,
            chainId: provider?.chainId,
            chainType: provider?.chainType,
            isConnected: provider?.isConnected,
            providerType: provider?.providerType,
            chainDetails: provider?.chainDetails,
            rawProvider: provider?.rawProvider,
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

    const _updateProviderState = () => {
        setProviderReactiveState({
            address: provider?.address,
            chainId: provider?.chainId,
            chainType: provider?.chainType,
            isConnected: provider?.isConnected,
            providerType: provider?.providerType,
            chainDetails: provider?.chainDetails,
            rawProvider: provider?.rawProvider,
        })
    }

    const init = async (
        providerProxy: ProviderProxyConstructor,
        providerDetector: ProviderDetector<PROVIDERS>,
        listeners?: ProviderListeners,
    ) => {
        const initedProvider = await createProvider(
            providerProxy,
            {
                providerDetector,
                listeners: {
                    onAccountChanged: () => {
                        listeners?.onAccountChanged?.()
                        _updateProviderState()
                    },
                    onChainChanged: () => {
                        listeners?.onChainChanged?.()
                        _updateProviderState()
                    },
                    onConnect: () => {
                        listeners?.onConnect?.()
                        _updateProviderState()
                    },
                    onDisconnect: () => {
                        listeners?.onDisconnect?.()
                        _updateProviderState()
                    },
                },
            },
        )
        setProvider(initedProvider)
    }

    useEffect(() => {
        if(provider?.address) {
            _updateProviderState()
            return () => {
                provider?.clearHandlers()
            }
        }
    }, [provider?.address])

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
