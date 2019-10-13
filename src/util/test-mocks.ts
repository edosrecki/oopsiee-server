import { fromPairs, map } from 'lodash'
import { Logger } from '../lib/logger'

export const buildLogger = (): Logger => {
  const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
  const logger = fromPairs(
    map(levels, (level) => [level, jest.fn()])
  )

  return logger as any
}
