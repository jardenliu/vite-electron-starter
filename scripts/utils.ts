import { resolve } from 'path'
import { loadEnv } from 'vite'

export function resolveSrc(...pathSegments: string[]) {
  return resolve(__dirname, '../src', ...pathSegments)
}

export function setEnvForProcess(mode: string, cwd: string) {
  const env = loadEnv(mode, cwd)
  for (const envKey in env) {
    if (process.env[envKey] === undefined && env.hasOwnProperty(envKey)) {
      process.env[envKey] = env[envKey]
    }
  }
}
