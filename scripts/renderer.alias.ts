import { getAliases } from 'vite-aliases'

export const aliases = getAliases({
  path: 'src/renderer',
  prefix: '',
  deep: true,
  depth: 1
})
