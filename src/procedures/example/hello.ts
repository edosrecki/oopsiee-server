import { Procedure } from '../types'
import { Logger } from '../../lib/logger'

interface Dependencies {
  logger: Logger
}

interface Params {
  name: string
}

export const hello: Procedure<Dependencies, Params> = ({ logger }) => async (params) => {
  logger.info({ params }, 'hello-procedure')

  return {
    message: `Hello, ${params.name}!`
  }
}
