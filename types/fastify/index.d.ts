import * as fastify from "fastify";
import * as http from "http";
import { RegisterOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { FastifyError } from 'fastify'
import { FastifyReply } from 'fastify'
import { DefaultQuery } from 'fastify'
import { DefaultParams } from 'fastify'
import { DefaultHeaders } from 'fastify'
import { DefaultBody } from 'fastify'
import { AwilixContainer } from 'awilix'
import { Context } from '../../src/procedures/types'

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    > {
    jwtAuth: (request: FastifyHttpRequest, reply: FastifyHttpResponse, next: FastifyNext) => void
  }

  export interface FastifyRequest<
    HttpRequest = http.IncomingMessage,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
    Body = DefaultBody
    > {
    container: AwilixContainer
    context: Context
  }

  export interface FastifyReply<HttpResponse> {
    sendFile: (filePath: string) => void
  }

  export type FastifyOptions = RegisterOptions<Server, IncomingMessage, ServerResponse>
  export type FastifyNext = (err?: FastifyError) => void

  export type FastifyHttpRequest = FastifyRequest<IncomingMessage>
  export type FastifyHttpResponse = FastifyReply<ServerResponse>
}
