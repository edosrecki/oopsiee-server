import { FastifyInstance } from 'fastify'
import { FastifyOptions, FastifyNext } from 'fastify-extensions'
import { getHealthcheckHandler } from './healthcheck'

export function healthcheckRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.get('/healthcheck', getHealthcheckHandler)

  next()
}
