import { success } from './libs/responseLib'

export async function handler(event, context, callback) {
  callback(null, success('API Root'))
}
