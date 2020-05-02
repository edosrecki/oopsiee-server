import { cleanEnv, num, str } from 'envalid'

const env = cleanEnv(process.env, {
  PORT: num({ default: 8000 }),
  LOG_LEVEL: str({ default: 'info' }),
  REDIS_URL: str(),
  REDIS_JOBS_QUEUE: str({ default: 'oopsiee-jobs' }),
})

interface Config {
  port: number
  address: string
  logging: {
    level: string
    useLevelLabels: boolean
    prettyPrint: boolean | any
    enabled: boolean,
  }
  redis: {
    url: string
    jobsQueue: string,
  }
}

const config: Config = {
  port: env.PORT,
  address: '0.0.0.0',
  logging: {
    level: env.LOG_LEVEL,
    useLevelLabels: !env.isProduction,
    prettyPrint: env.isProduction ? false : {
      translateTime: 'HH:MM:ss.l',
      colorize: true,
      ignore: 'hostname,pid',
    },
    enabled: !env.isTest,
  },
  redis: {
    url: env.REDIS_URL,
    jobsQueue: env.REDIS_JOBS_QUEUE,
  },
}

export { config, Config }
