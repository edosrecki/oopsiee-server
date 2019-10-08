import { FastifyInstance, FastifyOptions, FastifyNext } from 'fastify'
import { submitSyncHandler } from './sync/submit-sync.post'
import { submitAsyncHandler } from './async/submit-async.post'
import { fetchAsyncHandler } from './async/id/fetch-async.get'
import { fetchAsyncSchema, submitAsyncSchema, submitSyncSchema } from './schemas'

export function rpcRoutes (fastify: FastifyInstance, options: FastifyOptions, next: FastifyNext) {
  fastify.post('/rpc/sync', { schema: submitSyncSchema }, submitSyncHandler)
  fastify.post('/rpc/async', { schema: submitAsyncSchema }, submitAsyncHandler)
  fastify.get('/rpc/async/:id', { schema: fetchAsyncSchema }, fetchAsyncHandler)

  next()
}
