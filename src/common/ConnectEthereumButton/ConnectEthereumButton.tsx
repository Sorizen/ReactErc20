import './ConnectEthereumButton.scss'

import { PROVIDERS } from "@distributedlab/w3p";
import { useContext, useMemo, useState } from 'react'

import { AppButton } from '@/common'
import { ProviderContext } from '@/context'
import { ICON_NAMES } from "@/enums";
import { useAppSelector } from "@/hooks";
import { ChooseProviderModal } from '@/modals'

const ConnectEthereumButton = () => {
    const currentProvider =
        useAppSelector(state => state.useProviderModule.currentProvider)
    const w3provider = useContext(ProviderContext)

    const [isConnectModalShown, setIsConnectModalShown] = useState(false)

    const buttonText = useMemo(() => w3provider?.address || 'Connect Wallet', [w3provider?.address])

    const connectedWalletIcon = useMemo(() => {
        if(!w3provider?.address) { return  }
        switch(currentProvider) {
            case PROVIDERS.WalletConnect:
                return ICON_NAMES.walletConnect
            case PROVIDERS.Metamask:
                return ICON_NAMES.metamask
            case PROVIDERS.Phantom:
                return ICON_NAMES.phantomWallet
            default:
                return
        }
    }, [currentProvider, w3provider?.address])

    const handleClick = async () => {
        setIsConnectModalShown(true)
    }

    return (
        <div className="connect-ethereum-button">
            <AppButton
                className="connect-ethereum-button__button"
                scheme="primary"
                buttonSize="medium"
                modification="border-rounded"
                disabled={Boolean(w3provider?.address)}
                iconRight={connectedWalletIcon}
                text={buttonText}
                onClick={handleClick}
            />
            <ChooseProviderModal
                isShown={isConnectModalShown}
                updateIsShown={setIsConnectModalShown}
            />
        </div>
    );
};

export default ConnectEthereumButton;
