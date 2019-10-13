import { FastifyInstance, HTTPInjectOptions, HTTPInjectResponse } from 'fastify'
import { authorizationHeader } from './authorization-header'

interface FastifyInjectResponse extends HTTPInjectResponse {
  payload: any
}

export const injectAuthRequest = (server: FastifyInstance, opts: HTTPInjectOptions): Promise<FastifyInjectResponse> =>
  injectRequest(server,{
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: authorizationHeader
    }
  })

export const injectRequest = async (server: FastifyInstance, opts: HTTPInjectOptions): Promise<FastifyInjectResponse> => {
  const response = await server.inject(opts)

  return {
    ...response,
    payload: JSON.parse(response.payload)
  }
}