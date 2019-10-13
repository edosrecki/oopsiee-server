import { asValue, createContainer } from 'awilix'
import { HTTPInjectOptions } from 'fastify'
import { buildServer } from '../../../build-server'
import { injectAuthRequest, injectRequest } from '../../../../../util/test/inject-request'
import { Procedure } from '../../../../../procedures/types'
import { Container } from '../../../../../container'

describe('routes.rpc.submit-sync', () => {

  const request: HTTPInjectOptions = {
    method: 'POST',
    url: 'rpc/sync',
    payload: {
      procedure: 'test.oopsiee',
      params: {
        foo: 'bar'
      }
    }
  }

  const buildContainer = (): Container => {
    const container = createContainer()
    container.register('config', asValue({}))
    return container
  }

  // ~~~~

  it(`return '401 Unauthorized' if user is not authenticated`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
  })

  it(`return '404 Not Found' if procedure does not exist`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(404)
    expect(response.payload.message).toBe(`Procedure 'test.oopsiee' not found.`)
  })

  it(`return '500 Internal Server Error' if procedure throws an error`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const procedure: Procedure = async () => { throw new Error('test-error') }
    container.register('procedures.test.oopsiee', asValue(procedure))

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(500)
    expect(response.payload.message).toBe("test-error")
  })

  it('call procedure and return its result', async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const procedure: Procedure = async (params, context) => ({ params, context })
    container.register('procedures.test.oopsiee', asValue(procedure))

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual({
      params: { foo: 'bar' },
      context: { user: 'test' }
    })
  })
})
