import { FastifyInstance, FastifyOptions, FastifyNext } from 'fastify'
import { getSendsNotSendsHandler } from './campaigns/id/get-sends-not-sends'

export function pushRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.get('/push/campaigns/:campaignId/sends-not-sends', getSendsNotSendsHandler)

  next()
}
