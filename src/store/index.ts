import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistReducer,persistStore  } from 'redux-persist';
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

// TODO: REFACTOR

export default store

export const persistor = persistStore(store)
