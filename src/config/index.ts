import 'dotenv/config'
import path from 'path'

const { NODE_ENV, PORT = 3000, URL_API } = process.env

export const env = {
  isDev: NODE_ENV !== 'production',
  port: Number(PORT)
}

export const constants = {
  BASE_URL_API: '/api/v1',
  URL_API,
  SWAGGER_PATH: path.resolve(__dirname, '../../swagger.yaml')
}
