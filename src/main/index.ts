import { app, BrowserWindow } from 'electron'
import { URL } from 'url'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.disableHardwareAcceleration()

const env = import.meta.env

if (env.DEV) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAcess: true
        }
      })
    )
    .catch((e) => console.error('Failed install extension:', e))
}

let mainWindow: BrowserWindow | null = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      // TODO: preload
      contextIsolation: env.MODE === 'test',
      enableRemoteModule: env.MODE === 'test'
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()

    if (env.DEV) {
      mainWindow?.webContents.openDevTools()
    }
  })

  const pageUrl = env.DEV
    ? (env.VITE_DEV_SERVER_URL as string)
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()

  await mainWindow.loadURL(pageUrl)
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create mainWindow:', e))
