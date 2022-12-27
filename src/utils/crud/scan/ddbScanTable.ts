import { QueryInput } from '@aws-sdk/client-dynamodb'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'

export const scanTableInDynamoDb = async (tableName: string) => {
  try {
    const params: QueryInput = {
      TableName: tableName,
    }
    const data = await ddbDocClient.send(new ScanCommand(params))

    return data.Items
  } catch (err) {
    // TODO: Use logger
    console.log('Error', err)
  }
}
