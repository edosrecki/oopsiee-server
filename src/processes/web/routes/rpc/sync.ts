import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify'
import { get } from 'lodash'
import procedures from '../../../../procedures'

interface SyncRequest extends FastifyHttpRequest {
  body: {
    procedure: string,
    params: { [key: string]: any }
  }
}

export async function syncHandler (request: SyncRequest, reply: FastifyHttpResponse) {
  const procedure = get(procedures, request.body.procedure)

  if (!procedure) {
    throw new Error('Procedure not found.')
  }

  const result = await procedure(request.body.params, request.container.cradle)
  reply.send(result)
}
