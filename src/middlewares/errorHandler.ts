import boom from '@hapi/boom'
import { ErrorRequestHandler } from 'express'
import { env } from '../config'
import { logger } from '../utils/logger'

const errorStack = (err: any, stack: unknown): any => {
  if (env.isDev) {
    return { ...err, stack }
  }
  return err
}

export const logErrors: ErrorRequestHandler = (error, _req, _res, next) => {
  if (env.isDev) logger.error(error)
  else logger.info(error.message)
  next(error)
}

export const wrapErrors: ErrorRequestHandler = (error, _req, _res, next) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!error.isBoom) next(boom.badImplementation(error))
  next(error)
}

export const errorHandler: ErrorRequestHandler = (error, _req, res) => {
  const {
    output: { statusCode, payload }
  } = error
  return res
    .status(statusCode)
    .json({ error: errorStack(payload, error.stack) })
}
