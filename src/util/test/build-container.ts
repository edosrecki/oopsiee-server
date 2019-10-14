import { asValue, createContainer } from 'awilix'
import { Container } from '../../container'
import { authKeys } from './auth-keys'

export const buildContainer = (): Container => {
  const container = createContainer()

  container.register('config', asValue({}))
  container.register('auth.keys', asValue(authKeys))

  return container
}
