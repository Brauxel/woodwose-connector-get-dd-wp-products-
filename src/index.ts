import { scanTableInDynamoDb } from './utils/crud/scan/ddbScanTable'
import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

export const handler = async (): Promise<string> => {
  await hydrateEnv()
  await scanTableInDynamoDb()
  return 'hello'
}

handler()
