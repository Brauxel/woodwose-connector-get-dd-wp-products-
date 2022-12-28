import { ScanInput } from '@aws-sdk/client-dynamodb'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'
import { DynamoDbWordPressProduct } from '../../../types/dataTypes'
import { logAndThrowError } from '../../logger/loggerHelpers'

export const scanProductsTableInDynamoDb = async () => {
  try {
    const params: ScanInput = {
      TableName: process.env.WORDPRESS_PRODUCTS_TABLE_NAME,
    }
    const data = await ddbDocClient.send(new ScanCommand(params))

    return data.Items as DynamoDbWordPressProduct[]
  } catch (err) {
    const error = err as Error
    return logAndThrowError(
      `Error in Scan Table: ${process.env.WORDPRESS_PRODUCTS_TABLE_NAME}`,
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    )
  }
}
