import { oopsiee } from './oopsiee'
import { Logger } from '../../lib/logger'

describe('procedures.example.oopsiee', () => {
  const params = { key: 'value' }
  const context = { user: 'user' }

  const buildLogger = (): Logger => {
    const logger = { info: jest.fn() }
    return logger as any
  }

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
