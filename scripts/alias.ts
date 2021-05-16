import { getAliases } from 'vite-aliases'
import { sync as fgSync } from 'fast-glob'

const RENDERER_DIR = 'src/renderer'
const MAIN_DIR = 'src/main'
const PRELOAD_DIR = 'src/preload'

const getAlias = (path: string) => {
  const directories = fgSync(`${path}/*`, {
    onlyDirectories: true,
    absolute: true,
    cwd: process.cwd()
  })

  if (directories.length) {
    return getAliases({
      path: 'src/renderer',
      prefix: '',
      deep: true,
      depth: 1
    })
  }
  return {}
}

export const rendererAliases = getAlias(RENDERER_DIR)
export const mainAliases = getAlias(MAIN_DIR)
export const preloadAliases = getAlias(PRELOAD_DIR)
