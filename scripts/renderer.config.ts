import { defineConfig } from 'vite'
import { resolveSrc } from './utils'
import vue from '@vitejs/plugin-vue'
import { rendererAliases as alias } from './alias'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5500
  },
  resolve: {
    alias
  },
  root: resolveSrc('renderer'),
  plugins: [vue()]
})
