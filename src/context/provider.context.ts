import { createContext } from "react";

import { useProvider } from '@/hooks'

export const ProviderContext =
    createContext<null | ReturnType<typeof useProvider>>(null)
