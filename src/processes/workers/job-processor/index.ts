import { container } from '../../../container'
import { Logger } from '../../../lib/logger'
import { Queue } from '../../../lib/queue'
import { processJob } from './process-job'

(async function main () {
  const logger = container.resolve<Logger>('logger')
  const queue = container.resolve<Queue>('queue')

  logger.info('job-processor-start')

  await queue.process(processJob(container))
})()
