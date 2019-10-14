import { asValue, createContainer } from 'awilix'
import { processJob } from './process-job'
import { Job } from '../../../lib/queue'

describe('workers.job-processor.process-job', () => {

  const procedure = 'test.oopsiee'
  const params = { foo: 'bar' }
  const context =  { user: 'test' }
  const result = { 'pippo': 'inzaghi' }
  const buildJob = (): Job => {
    const job = {
      id: 1,
      data: { procedure, params, context },
      update: jest.fn()
    }

    return job as any
  }

  test('throw error if procedure does not exist', async () => {
    const container = createContainer()
    const job = buildJob()

    expect.assertions(1)
    try {
      await processJob(container)(job)
    } catch (error) {
      expect(error.message).toBe('Procedure not found.')
    }
  })

  test('call procedure and save its result to job data', async () => {
    const container = createContainer()
    const job = buildJob()

    const procedureFn = jest.fn().mockImplementation(async (params, context) => result)
    container.register('procedures.test.oopsiee', asValue(procedureFn))

    await processJob(container)(job)

    expect(job.update).toBeCalledWith({ procedure, params, context, result })
  })
})
