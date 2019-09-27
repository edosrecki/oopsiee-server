import { config } from 'dotenv'
import { getNumber, getString } from '@emartech/config-tools'

config()

const env = getString('NODE_ENV')
const isTest = env === 'test'
const isProd = env === 'production'

export const port = getNumber('PORT', 8000)
export const address = '0.0.0.0'

export const logging = {
  level: getString('LOG_LEVEL', 'info'),
  useLevelLabels: !isProd,
  prettyPrint: !isProd,
  enabled: !isTest
}
