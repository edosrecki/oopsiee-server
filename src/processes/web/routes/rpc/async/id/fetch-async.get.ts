import { FastifyHttpResponse } from 'fastify'
import { FetchAsyncRequest } from '../../types'
import { Queue } from '../../../../../../lib/queue'

export async function fetchAsyncHandler (request: FetchAsyncRequest, reply: FastifyHttpResponse) {
  const queue = request.container.resolve<Queue>('queue')
  const job = await queue.getJob(request.params.id)

  if (job) {
    reply.send(job.data.result)
  } else {
    reply.code(404).send({ message: `Job #${request.params.id} not found.`})
  }
}
