import { buildContainer } from '../../../../util/test/build-container'
import { buildServer } from '../../build-server'

describe('routes.commands.fetch-commands', () => {

  test('return YAML with commands definitions', async () => {
    const container = buildContainer()
    const server = buildServer(container)

    const response = await server.inject({
      method: 'GET',
      url: 'commands',
    })

    expect(response.headers['content-type']).toBe('text/yaml; charset=UTF-8')
  })
})
