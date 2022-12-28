import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { WordPressProduct } from './types/dataTypes'
import {
  queryProductById,
  queryProductVariationWithId,
} from './utils/crud/query/ddbQueryTable'
import { scanProductsTableInDynamoDb } from './utils/crud/scan/ddbScanTable'
import { makeProcessedProducts } from './utils/data-maker/productData'
import { logger } from './utils/logger/buildLogger'
import { hydrateEnv } from './utils/secrets/hydrateEnv'

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  logger.info(`Handler called with the event: ${JSON.stringify(event)}`)
  await hydrateEnv()
  let data: WordPressProduct[] = []

  if (event.queryStringParameters) {
    if (event.queryStringParameters.id) {
      const queriedProduct = await queryProductById(
        event.queryStringParameters.id
      )

      if (queriedProduct && queriedProduct?.length > 0) {
        data = await makeProcessedProducts(queriedProduct)
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          data,
        }),
      }
    }

    if (event.queryStringParameters.variationId) {
      const queriedVariant = await queryProductVariationWithId(
        event.queryStringParameters.variationId
      )

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: queriedVariant,
        }),
      }
    }
  }

  const scanProductData = await scanProductsTableInDynamoDb()

  if (scanProductData && scanProductData?.length > 0) {
    data = await makeProcessedProducts(scanProductData)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
