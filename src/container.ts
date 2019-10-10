import { createContainer, asFunction, asValue } from 'awilix'
import { each } from 'lodash'
import { config } from './config'
import { buildLogger } from './lib/logger'
import { buildQueue } from './lib/queue'
import { procedures } from './procedures'

const container = createContainer()

container.register({
  config: asValue(config),
  logger: asFunction(buildLogger).singleton(),
  queue: asFunction(buildQueue).singleton()
})

each(procedures, (func, name) => {
  container.register(`procedure.${name}`, asFunction(func).scoped())
})

export { container }
