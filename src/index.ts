import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

hydrateEnv()
export const handler = (): string => {
  console.log('hello')
  return 'hello'
}

handler()
