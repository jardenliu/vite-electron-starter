import { defineConfig } from 'vite'
import { resolve } from 'path'
import { resolveSrc, setEnvForProcess } from './utils'
import { builtinModules } from 'module'
import { preloadAliases as alias } from './alias'

setEnvForProcess(process.env.MODE as string, process.cwd())

export default defineConfig({
  root: resolveSrc('preload'),
  resolve: {
    alias
  },
  build: {
    sourcemap: 'inline',
    target: 'chrome89',
    outDir: resolve(__dirname, '../dist/preload'),
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    emptyOutDir: true,
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
