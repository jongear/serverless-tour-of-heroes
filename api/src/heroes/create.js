import uuid from 'uuid'
import * as dynamo from '../libs/dynamoLib'
import { failure, success } from '../libs/responseLib'

export async function handler(event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      createdAt: Date.now(),
    },
  }

  try {
    await dynamo.call('put', params)
    callback(null, success(params.Item))
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}
