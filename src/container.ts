import { createContainer, asFunction, asValue } from 'awilix'
import { config } from './config'
import { buildLogger } from './lib/logger'
import { buildQueue } from './lib/queue'

const container = createContainer({
  injectionMode: 'CLASSIC'
})

container.register({
  config: asValue(config),
  logger: asFunction(buildLogger).singleton(),
  queue: asFunction(buildQueue).singleton()
})

export { container }
