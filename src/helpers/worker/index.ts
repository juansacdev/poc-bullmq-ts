import { Job, Worker } from 'bullmq'
import { plainToInstance } from 'class-transformer'
import { JobTask } from '../../types/jobTask'
import { logger } from '../../utils/logger'
import JobDictionary from '../jobs'
import { connection } from '../queue'

export const getJobInstance = (jobName: string, data: Record<string, unknown>): JobTask => {
  const jobClass = JobDictionary.get(jobName)

  const instance = jobClass && plainToInstance(jobClass, { data })

  if (!instance) {
    throw new Error(`Unable to find Job: ${jobName}`)
  }

  return instance
}

const workerHandler = async (job: Job) => {
  try {
    const instance = getJobInstance(job.name, job.data)

    instance.handler(job)

  } catch (error) {
    logger.error(error)
  }
}

export const defaultWorker = (workerName: string) => {
  try {
    const worker = new Worker(workerName, workerHandler, { concurrency: 8, connection })
    worker.on('failed', (job: Job) => {
      const instance = getJobInstance(job.name, job.data)
      instance?.failed(job)
      logger.info(`Job ID: ${job.id} has failed`)
    })
  } catch (error) {
    logger.error(error)
  }
}
