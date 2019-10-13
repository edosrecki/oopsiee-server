import { FastifyInstance, HTTPInjectOptions, HTTPInjectResponse } from 'fastify'
import { buildAuthorizationHeader } from './build-authorization-header'

interface FastifyInjectResponse extends HTTPInjectResponse {
  payload: any
}

export const injectAuthRequest = (server: FastifyInstance, opts: HTTPInjectOptions): Promise<FastifyInjectResponse> =>
  injectRequest(server,{
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: buildAuthorizationHeader({ user: 'test' })
    }
  })

export const injectRequest = async (server: FastifyInstance, opts: HTTPInjectOptions): Promise<FastifyInjectResponse> => {
  const response = await server.inject(opts)

  return {
    ...response,
    payload: JSON.parse(response.payload)
  }
}
