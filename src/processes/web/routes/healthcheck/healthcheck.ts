import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify'

export async function getHealthcheckHandler (request: FastifyHttpRequest, reply: FastifyHttpResponse) {
  reply.send({ success: true })
}
