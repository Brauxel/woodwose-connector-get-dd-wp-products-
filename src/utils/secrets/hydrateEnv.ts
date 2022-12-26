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

  if (!process.env.WORDPRESS_PRODUCTS_TABLE_NAME) {
    // TODO: Add an error logger here
    console.error('NO WORDPRESS_PRODUCTS_TABLE_NAME IN env')
  }
}
