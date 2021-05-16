export interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  [x: string]: any
}

declare global {
  export interface Window {
    $electron: ElectronApi
  }
}

const electron: ElectronApi = {
  versions: process.versions
}

window.$electron = electron
