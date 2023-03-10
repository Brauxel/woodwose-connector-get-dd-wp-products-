// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
// Set the AWS Region.
// export const REGION = 'ap-southeast-2' // For example, "us-east-1".
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({
  region: process.env.DEFAULT_REGION,
})
