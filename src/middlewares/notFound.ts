import boom from '@hapi/boom'
import { RequestHandler } from 'express'

export const notFoundHandler: RequestHandler = (_req, res): void => {
  const {
    output: { statusCode, payload }
  } = boom.notFound()

  res.status(statusCode).json(payload)
}
