import { AwilixContainer } from 'awilix'
import { Job } from '../../../lib/queue'
import { Procedure } from '../../../procedures/types'

export const processJob = (container: AwilixContainer) => async (job: Job) => {
  const resolutionPath = `procedure.${job.data.procedure}`

  const exists = container.has(resolutionPath)
  if (!exists) {
    throw new Error('Procedure not found.')
  }

  const procedure = container.resolve<Procedure>(resolutionPath)
  const result = await procedure(job.data.params, job.data.context)

  await job.update({
    ...job.data,
    result
  })
}
