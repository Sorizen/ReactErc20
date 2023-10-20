import '@/styles/app.scss'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
              <RouterProvider router={router} />
  </StrictMode>,
)
