import { asValue, createContainer } from 'awilix'
import { HTTPInjectOptions } from 'fastify'
import { Container } from '../../../../../../container'
import { buildServer } from '../../../../build-server'
import { injectAuthRequest, injectRequest } from '../../../../../../util/test/inject-request'

describe('routes.rpc.fetch-async', () => {

  const request: HTTPInjectOptions = {
    method: 'GET',
    url: 'rpc/async/1',
  }

  const buildContainer = (): Container => {
    const container = createContainer()
    container.register('config', asValue({}))
    return container
  }

  const buildAndRegisterQueue = (container: Container, job: any) => {
    const queue = { getJob: jest.fn() }
    queue.getJob.mockResolvedValueOnce(job)
    container.register('queue', asValue(queue))
    return queue
  }

  // ~~~~

  it(`return '401 Unauthorized' if user is not authenticated`, async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectRequest(server, request)

    expect(response.statusCode).toBe(401)
  })

  it(`return '404 Not Found' if job does not exist`, async () => {
    const container = buildContainer()
    const server = buildServer(container)
    const queue = buildAndRegisterQueue(container, null)

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(404)
    expect(response.payload.message).toBe('Job #1 not found.')
    expect(queue.getJob).toBeCalledWith('1')
  })

  it('return job result', async () => {
    const job = { data: { result: { foo: 'bar' } } }
    const container = buildContainer()
    const server = buildServer(container)
    buildAndRegisterQueue(container, job)

    const response = await injectAuthRequest(server, request)

    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual(job.data.result)
  })
})
