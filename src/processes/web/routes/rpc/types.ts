import { FastifyHttpRequest } from 'fastify'

export interface SubmitSyncRequest extends FastifyHttpRequest {
  body: {
    procedure: string,
    params: { [key: string]: any }
  }
}

export type SubmitAsyncRequest = SubmitSyncRequest

export interface FetchAsyncRequest extends FastifyHttpRequest {
  params: {
    id: number | string
  }
}
