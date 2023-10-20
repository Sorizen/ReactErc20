import { PROVIDERS } from '@distributedlab/w3p'

import { ICON_NAMES } from '@/enums'
import { AllowedProvider } from '@/types'

export const ALLOWED_PROVIDERS: AllowedProvider[] = [
    {
        name: PROVIDERS.Metamask,
        icon: ICON_NAMES.metamask,
    },
    {
        name: PROVIDERS.WalletConnect,
        icon: ICON_NAMES.walletConnect,
    },
    {
        name: PROVIDERS.Phantom,
        icon: ICON_NAMES.phantomWallet,
    },
]
