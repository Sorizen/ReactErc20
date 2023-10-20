import {
    PROVIDERS,
} from '@distributedlab/w3p'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProviderStore = {
    currentProvider: null | PROVIDERS
}

export const useProviderSlice = createSlice({
    name: 'use-provider',
    initialState: (): ProviderStore => ({
        currentProvider: null,
    }),
    reducers: {
        cleanCurrentProvider: (state) => {
            state.currentProvider = null
        },

        setCurrentProvider: (state, action: PayloadAction<PROVIDERS> ) => {
            state.currentProvider = action.payload
        },
    },
})

export const {
    cleanCurrentProvider,
    setCurrentProvider,
} = useProviderSlice.actions

export default useProviderSlice.reducer
