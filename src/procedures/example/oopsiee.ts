import { ProcedureFactory } from '../types'
import { Logger } from '../../lib/logger'

interface Dependencies {
  logger: Logger
}

interface Params {
  name: string
}

export const oopsiee: ProcedureFactory<Dependencies, Params> = ({ logger }) => async (params, context) => {
  logger.info({ params }, 'oopsiee-procedure')

  return {
    message: `Hello, ${context.user}!`
  }
}
