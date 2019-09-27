import { port, address, logging } from '../../config'
import { logger } from '../../lib/logger'
import { default as fastify } from 'fastify'

import { healthcheckRoutes } from './routes/healthcheck'

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
// TODO

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
