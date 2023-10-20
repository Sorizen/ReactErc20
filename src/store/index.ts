import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore   } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import useProviderModuleSlice from './slices/useProviderSlice.ts'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedProviderReducer = persistReducer(persistConfig, useProviderModuleSlice);

const store = configureStore({
    reducer: {
        useProviderModule: persistedProviderReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store

export const persistor = persistStore(store)

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector:
    TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
