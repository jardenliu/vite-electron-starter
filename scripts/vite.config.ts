import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { aliases } from './renderer.alias'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases
  },
  root: resolve(__dirname, '../src/renderer'),
  plugins: [vue()]
})
