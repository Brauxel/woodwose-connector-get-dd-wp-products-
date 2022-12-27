import { WordPressProduct, WordPressProductVariation } from './types/dataTypes'
import { queryTableInDynamoDb } from './utils/crud/query/ddbQueryTable'
import { scanTableInDynamoDb } from './utils/crud/scan/ddbScanTable'
import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

export const handler = async (): Promise<any> => {
  await hydrateEnv()
  const scanProductData = await scanTableInDynamoDb(
    process.env.WORDPRESS_PRODUCTS_TABLE_NAME || ''
  )

  const copyProduct: WordPressProduct[] = []

  if (scanProductData && scanProductData?.length > 0) {
    for (const product of scanProductData) {
      copyProduct.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        variations: [],
        date_modified_gmt: product.date_modified_gmt,
        date_created_gmt: product.date_created_gmt,
      })

      const v = product.variations.values()
      for (const item of v) {
        const data = await queryTableInDynamoDb(item)
        if (data && data.length > 0) {
          copyProduct[copyProduct.length - 1].variations.push({
            ...(data[0] as WordPressProductVariation),
          })
        }
      }
    }
  }

  return copyProduct
}

handler()
