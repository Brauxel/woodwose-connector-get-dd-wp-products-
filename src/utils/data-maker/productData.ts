import {
  DynamoDbWordPressProduct,
  WordPressProduct,
  WordPressProductVariation,
} from '../../types/dataTypes'
import { queryTableInDynamoDb } from '../crud/query/ddbQueryTable'

export const makeVariationsArray = async (variationIds: Set<string>) => {
  const variationsArray = []
  for (const item of variationIds) {
    const data = await queryTableInDynamoDb(
      process.env.WORDPRESS_PRODUCT_VARIATIONS_TABLE_NAME || '',
      item
    )
    if (data && data.length > 0) {
      variationsArray.push({
        ...(data[0] as WordPressProductVariation),
      })
    }
  }

  return variationsArray
}

export const makeProcessedProducts = async (
  scanProductData: DynamoDbWordPressProduct[]
) => {
  const processedProduct: WordPressProduct[] = []
  if (scanProductData && scanProductData?.length > 0) {
    for (const product of scanProductData) {
      const variations = await makeVariationsArray(product.variations)
      processedProduct.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        variations,
        date_modified_gmt: product.date_modified_gmt,
        date_created_gmt: product.date_created_gmt,
      })
    }
  }

  return processedProduct
}
