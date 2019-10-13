import { oopsiee } from './oopsiee'
import { buildLogger } from '../../util/test-mocks'

describe('procedures.example.oopsiee', () => {
  const params = { key: 'value' }
  const context = { user: 'user' }

  // ~~~~

  test('log params to info level', async () => {
    const logger = buildLogger()
    const procedure = oopsiee({ logger })

    await procedure(params, context)

    expect(logger.info).toBeCalledTimes(1)
    expect(logger.info).toBeCalledWith({ params }, 'procedures.example.oopsiee')
  })

  test('return hello message', async () => {
    const logger = buildLogger()
    const procedure = oopsiee({ logger })

    const result = await procedure(params, context)

    expect(result).toEqual({ message: 'Hello, user!' })
  })
})
