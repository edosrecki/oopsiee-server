import { FastifyInstance, FastifyOptions, FastifyNext } from 'fastify'
import { syncHandler } from './sync'

export function rpcRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.post('/rpc/sync', syncHandler)

  next()
}
