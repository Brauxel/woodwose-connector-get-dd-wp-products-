import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'
import {
  DynamoDbWordPressProduct,
  DynamoDBWordPressProductVariation,
} from '../../../types/dataTypes'
import { logger } from '../../logger/buildLogger'
import { logAndThrowError } from '../../logger/loggerHelpers'

export const queryProductVariationWithId = async (primaryKey: string) => {
  try {
    const params = {
      TableName: process.env.WORDPRESS_PRODUCT_VARIATIONS_TABLE_NAME,
      ExpressionAttributeValues: {
        ':s': primaryKey,
      },
      KeyConditionExpression: 'id = :s',
    }
    const data = await ddbDocClient.send(new QueryCommand(params))
    logger.info(
      `Successfully received a response from ${
        process.env.WORDPRESS_PRODUCT_VARIATIONS_TABLE_NAME
      } table: ${JSON.stringify(data)}`
    )

    return data.Items as DynamoDBWordPressProductVariation[]
  } catch (err) {
    const error = err as Error
    return logAndThrowError(
      `Error in Query Table: ${
        process.env.WORDPRESS_PRODUCT_VARIATIONS_TABLE_NAME
      } with id: ${JSON.stringify(primaryKey)}`,
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    )
  }
}

export const queryProductById = async (id: string) => {
  try {
    const params = {
      TableName: process.env.WORDPRESS_PRODUCTS_TABLE_NAME,
      ExpressionAttributeValues: {
        ':s': id,
      },
      KeyConditionExpression: 'id = :s',
    }
    const data = await ddbDocClient.send(new QueryCommand(params))

    return data.Items as DynamoDbWordPressProduct[]
  } catch (err) {
    const error = err as Error
    return logAndThrowError(
      `Error in Query Table: ${
        process.env.WORDPRESS_PRODUCTS_TABLE_NAME
      } with id: ${JSON.stringify(id)}`,
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    )
  }
}
