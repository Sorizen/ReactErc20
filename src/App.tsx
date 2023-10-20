import { HTMLAttributes, useEffect } from 'react'

import { ProviderContext } from '@/context'
import { initProvider } from '@/helpers'
import { useAppSelector, useProvider } from '@/hooks'

function App({ children }: HTMLAttributes<HTMLDivElement>) {
    const currentProvider =
        useAppSelector(state => state.useProviderModule.currentProvider)
    const provider = useProvider()

    useEffect(() => {
        if(!currentProvider) { return }
        initProvider(provider, currentProvider) },
        [provider.address],
    );

    return (
        <ProviderContext.Provider value={provider}>
            <div className="app">
                {children}
            </div>
        </ProviderContext.Provider>
    )
}

export default App
