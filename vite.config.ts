import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as fs from 'fs'
import * as path from 'path'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative: string) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@import "@/styles/_functions.scss";',
          '@import "@/styles/_mixins.scss";',
        ].join(''),
      },
    },
  },
  resolve: {
    alias: {
      '@': `${root}/`
    }
  },
})
