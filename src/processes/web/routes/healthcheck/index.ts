import { FastifyInstance, FastifyOptions, FastifyNext } from 'fastify'
import { getHealthcheckHandler } from './healthcheck.get'

export function healthcheckRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.get('/healthcheck', getHealthcheckHandler)

  next()
}
