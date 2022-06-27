import { Job, JobsOptions } from 'bullmq'

export interface JobTask {
  readonly jobName: string
  data: Record<string, unknown>
  handler(job: Job): void // use this method to implement all the logic you want to do with the job
  failed(job: Job): void // use this method to implement all the logic you want to do with the job if this fail
}

export interface JobData {
  name: string
  data: Record<string, unknown>
  args?: JobsOptions
}
