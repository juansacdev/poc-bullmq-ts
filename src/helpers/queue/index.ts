import { ConnectionOptions, Job, Queue, QueueScheduler } from "bullmq"
import { JobData } from "../../types/jobTask"
import { defaultWorker } from '../worker'

export const connection: ConnectionOptions = {
  host: 'redis',
  port: 6379
}

class TaskQueue {
  readonly queueName: string
  private queue: Queue
  private queueScheduler: QueueScheduler

  constructor(queueName: string) {
    this.queueName = queueName
    this.queue = new Queue(queueName, { connection })
    this.queueScheduler = new QueueScheduler(queueName, { connection })
    this.queueScheduler.waitUntilReady()
    defaultWorker(queueName)
  }

  getQueue() {
    return this.queue
  }

  async addTask({ name, data, args }: JobData): Promise<Job> {
    return this.queue.add(name, data, args)
  }
}

export const queue = new TaskQueue('testQueue')
