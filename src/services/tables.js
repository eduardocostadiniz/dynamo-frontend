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
  createTable: async function (data) {
    try {
      const params = {
        AttributeDefinitions: [
          {
            AttributeName: data.hashKey,
            AttributeType: data.hashKeyType
          }
        ],
        KeySchema: [
          {
            AttributeName: data.hashKey,
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: data.readCapability,
          WriteCapacityUnits: data.writeCapability
        },
        TableName: data.tableName
      }

      if (data.rangeKey && data.rangeKeyType) {
        params['AttributeDefinitions'].push({
          AttributeName: data.rangeKey,
          AttributeType: data.rangeKeyType
        })
        params['KeySchema'].push({
          AttributeName: data.rangeKey,
          KeyType: 'RANGE'
        })
      }

      await DynamoDB.createTable(params).promise()
      return true
    } catch (err) {
      console.error(err)
    }
  },
  deleteTable: async function (tableName) {
    try {
      await DynamoDB.deleteTable({TableName: tableName}).promise()
      return true
    } catch (err) {
      console.error(err)
    }
  },
  listData: async function (tableName,) {
    try {
      const params = {
        ExpressionAttributeValues: {
          ':id': { S: 'KEY' }
        },
        KeyConditionExpression: 'id = :id',
        TableName: tableName
      }
      const response = await DynamoDB.query(params).promise()
      return (response.Items || []).map(dt => unmarshall(dt))
    } catch (err) {
      console.error(err)
    }
  },
  scanData: async function (tableName,) {
    try {
      const params = {
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