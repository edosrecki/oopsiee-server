import { FastifyError, FastifyReply, FastifyRequest, RegisterOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

// Fastify is not augmentation-friendly, because it uses 'export = ' syntax.
// Therefore, we are defining a separate module for extensions
declare module 'fastify-extensions' {
  type FastifyOptions = RegisterOptions<Server, IncomingMessage, ServerResponse>
  type FastifyNext = (err?: FastifyError) => void

  type FastifyHttpRequest = FastifyRequest<IncomingMessage>
  type FastifyHttpResponse = FastifyReply<ServerResponse>
}
