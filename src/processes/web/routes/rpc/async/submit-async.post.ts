import { FastifyHttpResponse } from 'fastify'
import { SubmitAsyncRequest } from '../types'
import { Queue } from '../../../../../lib/queue'

export async function submitAsyncHandler (request: SubmitAsyncRequest, reply: FastifyHttpResponse) {
  const queue = request.container.resolve<Queue>('queue')
  const job = await queue.add(request.body)

  reply.status(201).send({ id: job.id })
}
