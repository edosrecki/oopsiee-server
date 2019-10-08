import { get } from 'lodash'
import { container } from '../../../container'
import { Logger } from '../../../lib/logger'
import { Job, Queue } from '../../../lib/queue'
import procedures from '../../../procedures'

(async function main () {
  const logger = container.resolve<Logger>('logger')
  const queue = container.resolve<Queue>('queue')

  logger.info('start-processor')

  await queue.process(async (job: Job) => {
    const procedure = get(procedures, job.data.procedure)
    if (!procedure) {
      throw new Error('Procedure not found.')
    }

    const result = await procedure(job.data.params, container.cradle)
    await job.update({
      ...job.data,
      result
    })
  })
})()
