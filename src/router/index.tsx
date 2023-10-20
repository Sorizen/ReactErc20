import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import App from "@/App.tsx";
import { ConnectPage } from '@/pages'
import store, { persistor } from '@/store'

import { ROUTE_PATHS } from "./route-paths.ts";

export const router = createBrowserRouter([
    {
      path: ROUTE_PATHS.app,
        element: (<Suspense fallback={<></>}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App>
                        <Outlet />
                    </App>
                </PersistGate>
            </Provider>
        </Suspense>),
      children: [
          {
              path: '/',
              element: <Navigate replace to={ROUTE_PATHS.connect} />,
          },
          {
              path: ROUTE_PATHS.connect,
              element: <ConnectPage />,
          },
          {
              path: '*',
              element: <Navigate replace to={ROUTE_PATHS.connect} />,
          },
      ],
    },
]);

export  { ROUTE_PATHS } from './route-paths.ts'
