import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { JobData } from 'types/jobTask'
import { env } from './config'
import { queue } from './helpers/queue'
import { logger } from './utils/logger'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/queue', (req: Request, res: Response ): void => {

  const jobData = req.body as JobData

  queue.addTask(jobData)
    .then((job) => {
      logger.info({ jobID: job.id, jobName: job.name, jobData: job.data })
      res.status(200).json({ data: { msg: 'queued successfully', jobId: job.id }, status: 'queued' })
    })
  .catch(e => console.log(e))
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.listen(env.port, () => logger.info(`Server at localhost:${env.port}`))
