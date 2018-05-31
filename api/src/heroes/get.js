import * as dynamoDbLib from '../libs/dynamoLib'
import { failure, success } from '../libs/responseLib'

export async function handler(event, context, callback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  }

  try {
    const result = await dynamoDbLib.call('get', params)
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item))
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }))
    }
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}
