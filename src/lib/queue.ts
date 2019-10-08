import Bull from 'bull'
import { Config } from '../config'

export type Queue = Bull.Queue
export type Job = Bull.Job

export const buildQueue = (config: Config): Queue =>
  new Bull(config.redis.jobsQueue, config.redis.url)
