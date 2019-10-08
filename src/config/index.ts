import { config as loadEnv } from 'dotenv'
import { getNumber, getString } from '@emartech/config-tools'

loadEnv()

const env = getString('NODE_ENV')
const isTest = env === 'test'
const isProd = env === 'production'

interface Config {
  port: number
  address: string
  basicAuth: {
    username: string
    password: string
  }
  logging: {
    level: string
    useLevelLabels: boolean
    prettyPrint: boolean | any
    enabled: boolean
  }
}

const config: Config = {
  port: getNumber('PORT', 8000),
  address: '0.0.0.0',
  basicAuth: {
    username: getString('BASIC_AUTH_USERNAME', 'oopsiee'),
    password: getString('BASIC_AUTH_PASSWORD', 'oopsiee')
  },
  logging: {
    level: getString('LOG_LEVEL', 'info'),
    useLevelLabels: !isProd,
    prettyPrint: isProd ? false : {
      translateTime: 'HH:MM:ss.l',
      colorize: true,
      ignore: 'hostname,pid'
    },
    enabled: !isTest
  }
}

export { config, Config }
