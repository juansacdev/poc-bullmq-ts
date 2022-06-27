import { Job } from 'bullmq'
import { logger } from '../../utils/logger'
import { JobTask } from '../../types/jobTask'

export class MyJob implements JobTask {
  readonly jobName: string
  data: Record<string, unknown> = {}

  constructor (jobName: string) {
    this.jobName = jobName
  }

  handler (_job: Job): void {
    logger.info(`I'm the handler for ${MyJob.name}`)
  }

  failed (job: Job): void {
    logger.info(`Job: (${this.jobName} with ID: ${job.id} has failed)`)
  }
}

export const myFirstJob = new MyJob('myJob')
