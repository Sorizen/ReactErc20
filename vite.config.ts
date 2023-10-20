import react from '@vitejs/plugin-react'
import * as fs from 'fs'
import * as path from 'path'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative: string) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

export default defineConfig({
  plugins: [
      react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: '[name]',
    }),


  ],
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
      '@': `${root}/`,
    },
  },
})
