import fastify, { HTTPInjectOptions } from 'fastify'
import { authKeys } from '../../../util/test/auth-keys'
import { buildAuthorizationHeader } from '../../../util/test/build-authorization-header'
import { injectRequest } from '../../../util/test/inject-request'
import { jwtAuth } from './jwt-auth'

describe('web.plugins.jwt-auth', () => {

  const baseRequest: HTTPInjectOptions = {
    method: 'GET',
    url: '/',
  }

  const server = fastify()
  server.register(jwtAuth(authKeys))
  server.register((instance, opts, next) => {
    instance.addHook('onRequest', instance.jwtAuth)
    instance.get('/', (request, reply) => {
      reply.send(request.context)
    })
    next()
  })

  // ~~~~

  test(`return '401 Unauthorized' if authorization header is missing`, async () => {
    const response = await injectRequest(server, baseRequest)

    expect(response.statusCode).toBe(401)
    expect(response.payload.message).toEqual(`Missing 'Authorization' header.`)
  })

  test(`return '401 Unauthorized' if authorization header is invalid`, async () => {
    const request = {
      ...baseRequest,
      headers: {
        Authorization: 'I1NiIsInR5cCI6IkpXVCJ9eyJ1c2VyIjoiZ',
      },
    }

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
    expect(response.payload.message).toEqual(`Invalid 'Authorization' header.`)
  })

  test(`return '401 Unauthorized' if JWT token payload is invalid`, async () => {
    const request = {
      ...baseRequest,
      headers: {
        Authorization: buildAuthorizationHeader({ invalid: 'payload' }),
      },
    }

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
    expect(response.payload.message).toEqual('Invalid JWT token payload.')
  })

  test(`return '401 Unauthorized' if user does not have access`, async () => {
    const request = {
      ...baseRequest,
      headers: {
        Authorization: buildAuthorizationHeader({ user: 'pippo' }),
      },
    }

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
    expect(response.payload.message).toEqual('Missing PEM key for user pippo.')
  })

  test(`return '401 Unauthorized' if JWT signature is invalid`, async () => {
    const header = buildAuthorizationHeader({ user: 'test' })
    const request = {
      ...baseRequest,
      headers: {
        Authorization: `${header}foo`,
      },
    }

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
    expect(response.payload.message).toEqual('Invalid JWT token signature.')
  })

  test('set request context', async () => {
    const context = { user: 'test' }
    const request = {
      ...baseRequest,
      headers: {
        Authorization: buildAuthorizationHeader(context),
      },
    }

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual(context)
  })
})
