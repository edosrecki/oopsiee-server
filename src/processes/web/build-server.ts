import fastify from 'fastify'
import path from 'path'
import { Config } from '../../config'
import { Container } from '../../container'
import { jwtAuth } from './plugins/jwt-auth'

// Routes
import { commandsRoutes } from './routes/commands'
import { healthcheckRoutes } from './routes/healthcheck'
import { rpcRoutes } from './routes/rpc'

export const buildServer = (container: Container) => {
  const config = container.resolve<Config>('config')
  const keys = container.resolve('auth.keys')

  const server = fastify({
    logger: config.logging,
  })

  server.addHook('preHandler', (request, reply, next) => {
    request.container = container.createScope()
    next()
  })

  server.register(require('fastify-static'), {
    root: path.join(__dirname, '../../commands'),
  })

  /*
   * Public
   */
  server.register(healthcheckRoutes)
  server.register(commandsRoutes)

  /*
   * JWT Auth
   */
  server.register(jwtAuth(keys))

  server.register((instance, options, next) => {
    instance.addHook('onRequest', server.jwtAuth)
    instance.register(rpcRoutes)

    next()
  })

  return server
}
