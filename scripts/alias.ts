import { getAliases } from 'vite-aliases'

export const rendererAliases = getAliases({
  path: 'src/renderer',
  prefix: '',
  deep: true,
  depth: 1
})

export const mainAliases = getAliases({
  path: 'src/renderer',
  prefix: '',
  deep: true,
  depth: 1
})
