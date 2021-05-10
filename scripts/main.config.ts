import { defineConfig } from 'vite'
import { resolveSrc, setEnvForProcess } from './utils'
import { builtinModules } from 'module'
import { resolve } from 'path'
import { mainAliases as alias } from './alias'

setEnvForProcess(process.env.MODE as string, process.cwd())

export default defineConfig({
  root: resolveSrc('main'),
  resolve: {
    alias
  },
  build: {
    emptyOutDir: true,
    sourcemap: 'inline',
    target: 'node14',
    outDir: resolve(__dirname, '../dist'),
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2
      },
      safari10: false
    },
    lib: {
      entry: 'index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', 'electron-updater', ...builtinModules],
      output: {
        entryFileNames: '[name].cjs'
      }
    }
  }
})
