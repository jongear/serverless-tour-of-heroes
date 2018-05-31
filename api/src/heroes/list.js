import * as dynamo from '../libs/dynamoLib'
import { failure, success } from '../libs/responseLib'

export async function handler(event, context, callback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  }

  try {
    const result = await dynamo.call('scan', params)
    callback(null, success(result.Items))
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}
