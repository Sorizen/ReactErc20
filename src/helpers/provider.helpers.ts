import {
    CHAIN_TYPES,
    MetamaskProvider,
    PhantomProvider,
    Provider,
    ProviderDetector,
    PROVIDERS, WalletConnectEvmProvider,
} from '@distributedlab/w3p'

import { useProvider } from '@/hooks'

export const detectProviders = async () => {
    const providerDetector = new ProviderDetector<PROVIDERS>()
    // TODO: MOVE IT TO CONST WHEN CHAINS WILL BE APPLIED
    Provider.setChainsDetails({
        1284: {
            id: '0x504',
            name: 'Moonbean',
            rpcUrl: 'https://endpoints.omniatech.io/v1/moonbeam/mainnet/public',
            explorerUrl: 'https://moonscan.io/',
            token: { name: 'Moonbean', symbol: 'GLMR', decimals: 18 },
            type: CHAIN_TYPES.EVM,
            icon: '',
        },
    })
    await providerDetector.init()
    providerDetector.addProvider({
        name: PROVIDERS.WalletConnect,
        instance: {
            projectId: 'afb05099ebb2c59743d8b571e0e7f297',
            relayUrl: 'wss://relay.walletconnect.com',
            logger: 'info',
        },
    })

    return { foundProviders: providerDetector.providers, providerDetector }
}

export const initProvider =
    async (
        provider: ReturnType<typeof useProvider>,
        providerToInit?: PROVIDERS,
    ) => {

    const { foundProviders, providerDetector } = await detectProviders()

    if(providerToInit) {
        const foundProviderToInit =
            Object.keys(foundProviders)
                .some(foundName => foundName === providerToInit)
        if(foundProviderToInit) {
            switch (providerToInit) {
                case PROVIDERS.Metamask:
                    await provider.init(MetamaskProvider, providerDetector)
                    return
                case PROVIDERS.WalletConnect:
                    await provider.init(
                        WalletConnectEvmProvider,
                        providerDetector,
                    )
                    return
                case PROVIDERS.Phantom:
                    await provider.init(PhantomProvider, providerDetector)
                    return
                default:
                    return
            }
        }
    }
}
