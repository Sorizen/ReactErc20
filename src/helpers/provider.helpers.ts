import {
    CHAIN_TYPES, CoinbaseProvider,
    MetamaskProvider, PhantomProvider,
    Provider,
    ProviderDetector,
    ProviderProxyConstructor,
    PROVIDERS, WalletConnectEvmProvider,
} from '@distributedlab/w3p'
import { BrowserProvider, Eip1193Provider } from 'ethers'

import { useProvider } from '@/hooks'

export const detectProviders = async () => {
    const providerDetector = new ProviderDetector<PROVIDERS>()
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
                if(
                    providerToInit === PROVIDERS.Metamask
                ) {
                    await provider.init(MetamaskProvider, { providerDetector })
                }
                if(
                    providerToInit === PROVIDERS.WalletConnect
                ) {
                    await provider.init(WalletConnectEvmProvider, { providerDetector })
                }
                if(
                    providerToInit === PROVIDERS.Phantom
                ) {
                    await provider.init(PhantomProvider, { providerDetector })
                }
        }
    }
}
