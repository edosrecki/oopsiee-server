import { Logger } from '../../lib/logger'
import { ProcedureFactory } from '../types'

interface Dependencies {
  logger: Logger
}

interface Params {
  [key: string]: any
}

export const oopsiee: ProcedureFactory<Dependencies, Params> = ({ logger }) => async (params, context) => {
  logger.info({ params }, 'procedures.example.oopsiee')

  return {
    message: `Hello, ${context.user}!`,
  }
}
