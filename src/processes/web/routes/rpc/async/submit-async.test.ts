import { asValue } from 'awilix'
import { HTTPInjectOptions } from 'fastify'
import { buildContainer } from '../../../../../util/test/build-container'
import { injectAuthRequest, injectRequest } from '../../../../../util/test/inject-request'
import { buildServer } from '../../../build-server'

describe('routes.rpc.submit-async', () => {

  const request: HTTPInjectOptions = {
    method: 'POST',
    url: 'rpc/async',
    payload: {
      procedure: 'test.oopsiee',
      params: {
        foo: 'bar',
      },
    },
  }

  // ~~~~

  test(`return '401 Unauthorized' if user is not authenticated`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
  })

  test(`return '404 Not Found' if procedure does not exist`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(404)
    expect(response.payload.message).toBe(`Procedure 'test.oopsiee' not found.`)
  })

  test('add a job to queue and return job ID', async () => {
    const container = buildContainer()
    container.register('procedures.test.oopsiee', asValue(() => { /* noop */ }))
    const server = buildServer(container)

    const queue = { add: jest.fn() }
    queue.add.mockResolvedValueOnce({ id: 1 })
    container.register('queue', asValue(queue))

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(201)
    expect(response.payload.id).toBe(1)
    expect(queue.add).toBeCalledWith({
      procedure: 'test.oopsiee',
      params: { foo: 'bar' },
      context: { user: 'test' },
    })
  })
})
