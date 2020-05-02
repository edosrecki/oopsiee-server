import { FastifyHttpRequest, FastifyHttpResponse } from 'fastify'

export function fetchCommandsHandler(request: FastifyHttpRequest, reply: FastifyHttpResponse) {
  reply.sendFile('commands.yml')
}
