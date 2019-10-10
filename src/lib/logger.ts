import { default as pino } from 'pino'
import { Config } from '../config'

export type Logger = pino.Logger

interface Dependencies {
  config: Config
}

export const buildLogger = ({ config }: Dependencies): Logger =>
  pino(config.logging)
