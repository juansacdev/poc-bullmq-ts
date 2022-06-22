import { Application } from 'express'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import { constants } from '../config'

const swaggerDocument = YAML.load(constants.SWAGGER_PATH)

export const router = (server: Application): void => {
  server.get('/', (_req, res) => res.redirect(`${constants.BASE_URL_API}/docs`))
  server.use(`${constants.BASE_URL_API}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}
