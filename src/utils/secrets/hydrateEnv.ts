import dotenv from 'dotenv'
import fs from 'fs'

export const hydrateEnv = async () => {
  if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' })
  }

  if (!process.env.DEFAULT_REGION) {
    // TODO: Add an error logger here
    console.error('NO DEFAULT_REGION IN env')
  }
}
