import * as fastify from "fastify";
import * as http from "http";
import { RegisterOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { FastifyError } from 'fastify'
import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify'

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    > {
    basicAuth: any
  }

  export type FastifyOptions = RegisterOptions<Server, IncomingMessage, ServerResponse>
  export type FastifyNext = (err?: FastifyError) => void

  export type FastifyHttpRequest = FastifyRequest<IncomingMessage>
  export type FastifyHttpResponse = FastifyReply<ServerResponse>
}
