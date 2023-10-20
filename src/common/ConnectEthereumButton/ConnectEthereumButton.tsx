import { useContext, useMemo, useState } from 'react'

import { AppButton } from '@/common'
import { ProviderContext } from '@/context'
import { ChooseProviderModal } from '@/modals'

const ConnectEthereumButton = () => {
    const w3provider = useContext(ProviderContext)

    const [isConnectModalShown, setIsConnectModalShown] = useState(false)

    const buttonText = useMemo(() => w3provider?.address || 'Connect Wallet', [w3provider?.address])

    const connectWallet = async () => {
        w3provider?.connect()
    }

    const handleClick = async () => {
        setIsConnectModalShown(true)
    }

    return (
        <div className="connect-ethereum-button">
            <AppButton
                scheme="primary"
                buttonSize="medium"
                modification="border-rounded"
                disabled={Boolean(w3provider?.isConnected)}
                text={buttonText}
                onClick={handleClick}
            />
            <ChooseProviderModal
                isShown={isConnectModalShown}
                updateIsShown={setIsConnectModalShown}
                onSubmit={connectWallet}
            />
        </div>
    );
};

export default ConnectEthereumButton;
