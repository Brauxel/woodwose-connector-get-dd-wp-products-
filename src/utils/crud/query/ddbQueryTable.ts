import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'
import { logAndThrowError } from '../../logger/loggerHelpers'

export const queryTableInDynamoDb = async (
  primaryKey: string
): Promise<Record<string, any>[] | undefined> => {
  try {
    const params = {
      // ExpressionAttributeNames: { '#y': 'year' },
      //   ProjectionExpression: '#r, #y, title',
      TableName: 'WoodWose_WP_Product_Variations',
      ExpressionAttributeValues: {
        ':s': primaryKey,
        // ':e': sortKey,
        // ':r': 'MOVIE_RANK',
      },
      KeyConditionExpression: 'id = :s',
      //   FilterExpression: 'info.#r = :r',
    }
    const data = await ddbDocClient.send(new QueryCommand(params))

    return data.Items
  } catch (err) {
    const error = err as Error
    return logAndThrowError('Error in Query Table', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  }
}
