import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify'

export async function getSendsNotSendsHandler (request: FastifyHttpRequest, reply: FastifyHttpResponse) {
  reply.send({ success: true })
}
