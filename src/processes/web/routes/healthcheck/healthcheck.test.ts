import { buildContainer } from '../../../../util/test/build-container'
import { buildServer } from '../../build-server'
import { injectRequest } from '../../../../util/test/inject-request'

describe('routes.healthcheck', () => {

  test('return success', async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await injectRequest(server, {
      method: 'GET',
      url: 'healthcheck'
    })

    expect(response.payload).toEqual({ success: true })
  })
})
