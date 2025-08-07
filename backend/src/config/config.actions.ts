import fs from 'fs'
import path from 'path'

import yaml from 'js-yaml'

import { LandingConfig } from './config.types'

let config: LandingConfig

export const getConfig = (): LandingConfig => {
  if (config) {
    return config
  }

  throw Error('Config undefined. Call readConfig() before')
}

export const readConfig = async (): Promise<void> => {
  try {
    const configUrl = path.join(process.cwd(), 'src/configs/backend.yaml')
    if (!fs.existsSync(configUrl)) {
      throw new Error(`Config file not found at ${configUrl}`)
    }

    const buffer = fs.readFileSync(configUrl)
    const parsed = yaml.load(buffer.toString())

    if (parsed !== null && typeof parsed === 'object') {
      config = parsed as any
    } else {
      throw new Error("Can't read YAML")
    }
  } catch (e) {
    console.error(e)
  }
}
