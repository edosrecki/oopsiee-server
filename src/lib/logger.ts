import { default as pino } from 'pino'
import { logging } from '../config'

const prettyPrint = {
  translateTime: 'yyyy-mm-dd HH:MM:ss.l',
  colorize: true,
  ignore: 'hostname,pid',
}

export const logger = pino({
  ...logging,
  prettyPrint: logging.prettyPrint ? prettyPrint : false,
  serializers: {
    err: pino.stdSerializers.err
  }
})
