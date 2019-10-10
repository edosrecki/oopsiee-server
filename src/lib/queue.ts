import Bull from 'bull'
import { Config } from '../config'

export type Queue = Bull.Queue
export type Job = Bull.Job

interface Dependencies {
  config: Config
}

export const buildQueue = ({ config }: Dependencies): Queue =>
  new Bull(config.redis.jobsQueue, config.redis.url)
