import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config'
import { errorHandler, logErrors, wrapErrors } from './middlewares/errorHandler'
import { notFoundHandler } from './middlewares/notFound'
import { router } from './routes'
import { logger } from './utils/logger'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!env.isDev) app.use(morgan('tiny'))
else app.use(morgan('dev'))

router(app)

app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(env.port, () => logger.info(`Server at localhost:${env.port}`))
