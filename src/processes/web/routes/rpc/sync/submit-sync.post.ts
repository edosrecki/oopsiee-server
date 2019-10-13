import { FastifyHttpResponse } from 'fastify'
import { SubmitSyncRequest } from '../types'
import { Procedure } from '../../../../../procedures/types'

export async function submitSyncHandler (request: SubmitSyncRequest, reply: FastifyHttpResponse) {
  const resolutionPath = `procedures.${request.body.procedure}`

  const exists = request.container.has(resolutionPath)
  if (!exists) {
    return reply.status(404).send({ message: 'Procedure not found.' })
  }

  const procedure = request.container.resolve<Procedure>(resolutionPath)
  const result = await procedure(request.body.params, request.context)
  reply.send(result)
}
