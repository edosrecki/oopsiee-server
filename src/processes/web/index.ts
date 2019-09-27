import { port, address, basicAuth, logging } from '../../config'
import { logger } from '../../lib/logger'
import fastify from 'fastify'

import { basicAuth as basicAuthHook } from './hooks/basic-auth'
import { healthcheckRoutes } from './routes/healthcheck'
import { pushRoutes } from './routes/push'

const server = fastify({
  logger: logging
})

server.register(require('fastify-sensible'))

/*
 * Public
 */
server.register(healthcheckRoutes)

/*
 * Basic Auth
 */
server.register(require('fastify-basic-auth'), basicAuthHook(basicAuth))

server.register((instance, options, next) => {
  instance.addHook('preHandler', server.basicAuth)
  instance.register(pushRoutes)

  next()
})

/*
 * Escher
 */
// TODO

function shutdown () {
  return server.close()
}

(async function main () {
  process.once('SIGTERM', shutdown)
  process.once('SIGINT', shutdown)

  server.listen(port, address, (error) => {
    if (error) {
      logger.error({ err: error }, 'server-start-error')
      process.exit(1)
    }
  })
})()
