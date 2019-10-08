import { default as pino } from 'pino'
import { Config } from '../config'

export type Logger = pino.Logger

export const buildLogger = (config: Config): Logger =>
  pino(config.logging)
