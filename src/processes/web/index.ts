import { Config } from '../../config'
import { container } from '../../container'
import { Logger } from '../../lib/logger'
import { buildServer } from './build-server'

const config = container.resolve<Config>('config')
const logger = container.resolve<Logger>('logger')

const server = buildServer(container)

function shutdown() {
  return server.close()
}

(async function main() {
  process.once('SIGTERM', shutdown)
  process.once('SIGINT', shutdown)

  server.listen(config.port, config.address, (error) => {
    if (error) {
      logger.error({ err: error }, 'web-startup-error')
      process.exit(1)
    }
  })
})()
