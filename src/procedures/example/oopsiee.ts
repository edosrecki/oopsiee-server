import { ProcedureFactory } from '../types'
import { Logger } from '../../lib/logger'

interface Dependencies {
  logger: Logger
}

interface Params {
  [key: string]: any
}

export const oopsiee: ProcedureFactory<Dependencies, Params> = ({ logger }) => async (params, context) => {
  logger.info({ params }, 'procedure: example.oopsiee')

  return {
    message: `Hello, ${context.user}!`
  }
}
