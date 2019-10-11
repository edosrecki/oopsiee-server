import fastify from 'fastify'
import { jwtAuth } from './plugins/jwt-auth'
import { container } from '../../container'
import { Config } from '../../config'
import { Logger } from '../../lib/logger'

// Routes
import { healthcheckRoutes } from './routes/healthcheck'
import { rpcRoutes } from './routes/rpc'

const config = container.resolve<Config>('config')
const logger = container.resolve<Logger>('logger')

const server = fastify({
  logger: config.logging
})

server.addHook('preHandler', (request, reply, next) => {
  request.container = container.createScope()
  next()
})

/*
 * Public
 */
server.register(healthcheckRoutes)

/*
 * JWT Auth
 */
server.register(jwtAuth)

server.register((instance, options, next) => {
  instance.addHook('onRequest', server.jwtAuth)
  instance.register(rpcRoutes)

  next()
})

function shutdown () {
  return server.close()
}

(async function main () {
  process.once('SIGTERM', shutdown)
  process.once('SIGINT', shutdown)

  server.listen(config.port, config.address, (error) => {
    if (error) {
      logger.error({ err: error }, 'server-start-error')
      process.exit(1)
    }
  })
})()
