import { createContainer, asFunction, asValue } from 'awilix'
import { config } from './config'
import { buildLogger } from './lib/logger'

const container = createContainer({
  injectionMode: 'CLASSIC'
})

container.register({
  config: asValue(config),
  logger: asFunction(buildLogger).singleton()
})

export default container
