import { Procedure } from '../types'
import { Logger } from '../../lib/logger'

interface P {
  id: string
}

interface D {
  logger: Logger
}

export const getCampaign: Procedure<P, D> = async ({ id }, { logger }) => {
  logger.info({ id }, 'get-campaign-procedure')

  return {
    id,
    name: `Campaign ${id}`
  }
}
