import { createServer } from 'vite'
import RendererConfig from './vite.config'

const startRenderer = async () => {
  const server = await createServer(RendererConfig as any)
  server.listen(8080)
  return server
}

const main = async () => {
  await startRenderer()
}

main().catch((e) => {
  console.log(e)
})
