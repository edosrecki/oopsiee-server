import { createContainer, asValue } from 'awilix'
import { buildServer } from '../../../build-server'
import { injectAuthRequest } from '../../../../../util/test/inject-request'
import { Procedure } from '../../../../../procedures/types'

describe('routes.rpc.submit-sync', () => {
  it('return 401 if not authorized', async () => {
    const container = createContainer()
    container.register('config', asValue({}))
    const server = buildServer(container)

    const response = await server.inject({
      method: 'POST',
      url: 'rpc/sync',
      payload: {
        procedure: 'test.oopsiee',
        params: {
          foo: 'bar'
        }
      }
    })

    expect(response.statusCode).toBe(401)
  })

  it('return 404 if procedure does not exist', async () => {
    const container = createContainer()
    container.register('config', asValue({}))
    const server = buildServer(container)

    const response = await injectAuthRequest(server,{
      method: 'POST',
      url: 'rpc/sync',
      payload: {
        procedure: 'test.nonexistent',
        params: {
          foo: 'bar'
        }
      }
    })

    expect(response.statusCode).toBe(404)
    expect(response.payload).toBe('{"message":"Procedure not found."}')
  })

  it('return 500 if procedure throws', async () => {
    const procedure: Procedure = async (params, context) => {
      throw new Error('test-error')
    }
    const container = createContainer()
    container.register('config', asValue({}))
    container.register('procedures.test.oopsiee', asValue(procedure))
    const server = buildServer(container)

    const response = await injectAuthRequest(server, {
      method: 'POST',
      url: 'rpc/sync',
      payload: {
        procedure: 'test.oopsiee',
        params: {
          foo: 'bar'
        }
      }
    })

    expect(response.statusCode).toBe(500)
    const payload = JSON.parse(response.payload)
    expect(payload.message).toBe("test-error")
  })

  it('call procedure and return its result', async () => {
    const procedure: Procedure = async (params, context) => ({ params, context })
    const container = createContainer()
    container.register('config', asValue({}))
    container.register('procedures.test.oopsiee', asValue(procedure))
    const server = buildServer(container)

    const response = await injectAuthRequest(server, {
      method: 'POST',
      url: 'rpc/sync',
      payload: {
        procedure: 'test.oopsiee',
        params: {
          foo: 'bar'
        }
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe('{"params":{"foo":"bar"},"context":{"user":"test"}}')
  })
})
