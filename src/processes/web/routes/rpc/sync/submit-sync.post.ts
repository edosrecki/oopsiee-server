import { FastifyHttpResponse } from 'fastify'
import { get } from 'lodash'
import { SubmitSyncRequest } from '../types'
import procedures from '../../../../../procedures'

export async function submitSyncHandler (request: SubmitSyncRequest, reply: FastifyHttpResponse) {
  const procedure = get(procedures, request.body.procedure)
  if (!procedure) {
    throw new Error('Procedure not found.')
  }

  const result = await procedure(request.body.params, request.container.cradle)
  reply.send(result)
}
