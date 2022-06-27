import { myFirstJob, MyJob } from './myJob'
import { myTestJob, TestJob } from './testJob'

const JobDictionary = new Map()
  .set(myFirstJob.jobName, MyJob)
  .set(myTestJob.jobName, TestJob)

export default JobDictionary
