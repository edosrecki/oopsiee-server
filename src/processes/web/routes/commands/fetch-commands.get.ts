import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify'

export async function fetchCommandsHandler (request: FastifyHttpRequest, reply: FastifyHttpResponse) {
  reply.sendFile('commands.yml')
}
