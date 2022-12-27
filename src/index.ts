import { WordPressProduct } from './types/dataTypes'
import { scanTableInDynamoDb } from './utils/crud/scan/ddbScanTable'
import { makeProcessedProducts } from './utils/data-maker/productData'
import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

export const handler = async (): Promise<WordPressProduct[]> => {
  await hydrateEnv()
  const scanProductData = await scanTableInDynamoDb(
    process.env.WORDPRESS_PRODUCTS_TABLE_NAME || ''
  )

  let processedProduct: WordPressProduct[] = []
  if (scanProductData && scanProductData?.length > 0) {
    processedProduct = await makeProcessedProducts(scanProductData)
  }

  return processedProduct
}

handler()
