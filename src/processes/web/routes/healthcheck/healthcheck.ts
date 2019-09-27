import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify-extensions'

export async function getHealthcheckHandler (request: FastifyHttpRequest, reply: FastifyHttpResponse) {
  reply.send({ success: true })
}
