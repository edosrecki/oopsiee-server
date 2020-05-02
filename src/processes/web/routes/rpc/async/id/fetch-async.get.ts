import { FastifyHttpResponse } from 'fastify'
import { Queue } from '../../../../../../lib/queue'
import { FetchAsyncRequest } from '../../types'

export async function fetchAsyncHandler(request: FetchAsyncRequest, reply: FastifyHttpResponse) {
  const queue = request.container.resolve<Queue>('queue')
  const job = await queue.getJob(request.params.id)

  if (!job) {
    return reply.code(404).send({ message: `Job #${request.params.id} not found.`})
  }

  reply.send(job.data.result)
}
