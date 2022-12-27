import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'
import { logAndThrowError } from '../../logger/loggerHelpers'

export const queryTableInDynamoDb = async (
  tableName: string,
  primaryKey: string
) => {
  try {
    const params = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':s': primaryKey,
      },
      KeyConditionExpression: 'id = :s',
    }
    const data = await ddbDocClient.send(new QueryCommand(params))

    return data.Items
  } catch (err) {
    const error = err as Error
    return logAndThrowError(`Error in Query Table: ${tableName}`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  }
}
