import { Job } from 'bullmq'
import { logger } from '../../utils/logger'
import { JobTask } from '../../types/jobTask'

export class TestJob implements JobTask {
  readonly jobName: string
  data: Record<string, unknown> = {}

  constructor (jobName: string) {
    this.jobName = jobName
  }

  handler (_job: Job): void {
    logger.info(`I'm the handler for ${TestJob.name}`)
  }

  failed (job: Job): void {
    logger.error(`Job: (${this.jobName} with ID: ${job.id} has failed)`)
  }
}

export const myTestJob = new TestJob('testJob')
