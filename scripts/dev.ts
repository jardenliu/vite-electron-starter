import {
  createServer,
  build,
  createLogger,
  ViteDevServer,
  InlineConfig,
  LogLevel
} from 'vite'
import RendererConfig from './renderer.config'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { AddressInfo } from 'net'
import * as electronPath from 'electron'

const mode = (process.env.MODE = process.env.MODE || 'development')

const LOG_LEVEL: LogLevel = 'warn'

const sharedConfig: InlineConfig = {
  mode,
  logLevel: LOG_LEVEL,
  build: {
    watch: {}
  }
}

const startRenderer = async () => {
  const server = await createServer(RendererConfig as any)
  await server.listen()
  return server
}

const startMainProcess = async (server: ViteDevServer) => {
  const protocol = server.config.server.https ? 'https://' : 'http://'
  const host = server.config.server.host || 'localhost'
  const address = server.httpServer?.address() as AddressInfo
  const port = address.port
  const path = '/'
  process.env.VITE_DEV_SERVER_URL = `${protocol}${host}:${port}${path}`

  const logger = createLogger('warn', { prefix: '[main]' })

  let spawnProcess: ChildProcessWithoutNullStreams | null = null

  return build({
    ...sharedConfig,
    configFile: 'scripts/main.config.ts',
    plugins: [
      {
        name: 'reload-app-on-main-package-changed',
        writeBundle: () => {
          if (spawnProcess !== null) {
            spawnProcess.kill('SIGINT')
            spawnProcess = null
          }

          spawnProcess = spawn(String(electronPath), ['.'])
          spawnProcess.stdout.on(
            'data',
            (d) =>
              d.toString().trim() &&
              logger.warn(d.toString(), { timestamp: true })
          )

          spawnProcess.stderr.on(
            'data',
            (d) =>
              d.toString().trim() &&
              logger.error(d.toString(), { timestamp: true })
          )
        }
      }
    ]
  })
}

const startPreloadProcess = (server: ViteDevServer) => {
  return build({
    ...sharedConfig,
    configFile: 'scripts/preload.config.ts',
    plugins: [
      {
        name: 'reload-page-on-preload-package-changed',
        writeBundle() {
          server.ws.send({
            type: 'full-reload'
          })
        }
      }
    ]
  })
}

const main = async () => {
  const server = await startRenderer()
  await startPreloadProcess(server)
  await startMainProcess(server)
}

main().catch((e) => {
  console.log(e)
})
