import { FastifyHttpResponse } from 'fastify'
import { Procedure } from '../../../../../procedures/types'
import { SubmitSyncRequest } from '../types'

export async function submitSyncHandler(request: SubmitSyncRequest, reply: FastifyHttpResponse) {
  const { procedure: procedureName, params } = request.body
  const resolutionPath = `procedures.${procedureName}`

  const exists = request.container.has(resolutionPath)
  if (!exists) {
    return reply.status(404).send({ message: `Procedure '${procedureName}' not found.` })
  }

  const procedure = request.container.resolve<Procedure>(resolutionPath)
  const result = await procedure(params, request.context)
  reply.send(result)
}
