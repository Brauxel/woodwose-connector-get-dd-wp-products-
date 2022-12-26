// Import required AWS SDK clients and commands for Node.js.
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../libs/ddbDocClient'

export const scanTableInDynamoDb = async () => {
  try {
    const params = {
      TableName: process.env.WORDPRESS_PRODUCTS_TABLE_NAME,
      //   ProjectionExpression: '#r, #y, title',
      //   ExpressionAttributeNames: { '#r': 'rank', '#y': 'year' },
      //   FilterExpression: 'title = :t and #y = :y and info.#r = :r',
      //   ExpressionAttributeValues: {
      //     ':r': 'MOVIE_RANK',
      //     ':y': 'MOVIE_YEAR',
      //     ':t': 'MOVIE_NAME',
      //   },
    }
    const data = await ddbDocClient.send(new ScanCommand(params))
    console.log('success', data.Items)
  } catch (err) {
    console.log('Error', err)
  }
}
