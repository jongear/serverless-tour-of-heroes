import * as dynamo from '../libs/dynamoLib'
import { failure, success } from '../libs/responseLib'

export async function handler(event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'SET #heroName = :heroName',
    ExpressionAttributeNames: {
      '#heroName': 'name',
    },
    ExpressionAttributeValues: {
      ':heroName': data.name ? data.name : '',
    },
    ReturnValues: 'ALL_NEW',
  }

  try {
    const result = await dynamo.call('update', params)
    callback(null, success({ status: true }))
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}
