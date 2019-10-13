import { FastifyHttpResponse } from 'fastify'
import { SubmitAsyncRequest } from '../types'
import { Queue } from '../../../../../lib/queue'

export async function submitAsyncHandler (request: SubmitAsyncRequest, reply: FastifyHttpResponse) {
  const procedureName = request.body.procedure

  const exists = request.container.has(`procedures.${procedureName}`)
  if (!exists) {
    return reply.status(404).send({ message: `Procedure '${procedureName}' not found.` })
  }

  const queue = request.container.resolve<Queue>('queue')
  const job = await queue.add({ ...request.body, context: request.context })

  reply.status(201).send({ id: job.id })
}
