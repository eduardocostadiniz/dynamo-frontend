import 'isomorphic-fetch'

import { DynamoDB, unmarshall } from '../providers/aws'

const tablesService = {
  listTables: async function () {
    try {
      const response = await DynamoDB.listTables({}).promise()
      return response.TableNames || []
    } catch (err) {
      console.error(err)
    }
  },
  describeTable: async function (tableName) {
    try {
      const response = await DynamoDB.describeTable({ TableName: tableName }).promise()
      return response.Table || {}
    } catch (err) {
      console.error(err)
    }
  },
  listData: async function (tableName, ) {
    try {
      const params = {
        ExpressionAttributeValues: {
          ':id': {S: 'COMPANY_PROFILES'}
        },
        // IndexName: '',
        KeyConditionExpression: 'id = :id',
        // ProjectionExpression: 'Episode, Title, Subtitle',
        // FilterExpression: 'contains (Subtitle, :topic)',
        TableName: tableName
      }
      const response = await DynamoDB.query(params).promise()
      return (response.Items || []).map(dt => unmarshall(dt))
    } catch (err) {
      console.error(err)
    }
  },
  scanData: async function (tableName, ) {
    try {
      const params = {
        // ExpressionAttributeValues: {
        //   ':id': {S: 'COMPANY_PROFILES'}
        // },
        // KeyConditionExpression: 'id = :id',
        // ProjectionExpression: 'Episode, Title, Subtitle',
        // FilterExpression: 'contains (Subtitle, :topic)',
        Limit: 10,
        TableName: tableName
      }
      const response = await DynamoDB.scan(params).promise()
      return (response.Items || []).map(dt => unmarshall(dt))
    } catch (err) {
      console.error(err)
    }
  }
}

export default tablesService