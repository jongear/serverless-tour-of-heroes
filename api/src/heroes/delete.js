import * as dynamo from '../libs/dynamoLib'
import { failure, success } from '../libs/responseLib'

export async function handler(event, context, callback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  }

  try {
    const result = await dynamo.call('delete', params)
    callback(null, success({ status: true }))
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}
