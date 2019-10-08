import { Procedure } from '../types'
import { Logger } from '../../lib/logger'

// Input parameters
interface P {
  name: string
}

// Dependencies
interface D {
  logger: Logger
}

export const hello: Procedure<P, D> = async ({ name }, { logger }) => {
  logger.info({ name }, 'hello-procedure')

  // Each procedure returns a JSON object
  return {
    message: `Hello, ${name}!`
  }
}
