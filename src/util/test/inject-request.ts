import { FastifyInstance, HTTPInjectOptions, HTTPInjectResponse } from 'fastify'
import { authorizationHeader } from './authorization-header'

export const injectAuthRequest = (server: FastifyInstance, opts: HTTPInjectOptions): Promise<HTTPInjectResponse> =>
  server.inject({
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: authorizationHeader
    }
  })

