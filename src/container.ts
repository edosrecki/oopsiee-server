import path from 'path'
import { AwilixContainer, createContainer, asFunction, asValue } from 'awilix'
import { each } from 'lodash'
import { config } from './config'
import { buildLogger } from './lib/logger'
import { buildQueue } from './lib/queue'
import { procedures } from './procedures'
import { readDirectory } from './util/read-directory'

export type Container = AwilixContainer

export const container = createContainer()

container.register({
  config: asValue(config),
  logger: asFunction(buildLogger).singleton(),
  queue: asFunction(buildQueue).singleton()
})

each(procedures, (func, name) => {
  container.register(`procedures.${name}`, asFunction(func).scoped())
})

const keysPath = path.join(__dirname, '../keys')
const keys = readDirectory(keysPath)
container.register('auth.keys', asValue(keys))
