import { logger } from './buildLogger'

export const logAndThrowError = (message: string, error: Error) => {
  logger.error(message, new Error(`${JSON.stringify(error, null, 2)}`))

  throw new Error(message)
}
