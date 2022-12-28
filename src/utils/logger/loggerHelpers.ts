import { logger } from './buildLogger'

export const logAndThrowError = (message: string, error: Error) => {
  logger.error(message, new Error(`${JSON.stringify(error)}`))

  throw new Error(message)
}
