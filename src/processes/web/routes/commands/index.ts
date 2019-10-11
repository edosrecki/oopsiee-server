import { FastifyInstance, FastifyOptions, FastifyNext } from 'fastify'
import { fetchCommandsHandler } from './fetch-commands.get'

export function commandsRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.get('/commands', fetchCommandsHandler)

  next()
}
