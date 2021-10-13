
import { DynamoDB, marshall, unmarshall } from '../providers/aws'

const tablesService = {
  listTables: async function () {
    try {
      const response = await DynamoDB.listTables({}).promise()
      return response.TableNames || []
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  describeTable: async function (tableName) {
    try {
      const response = await DynamoDB.describeTable({ TableName: tableName }).promise()
      return response.Table || {}
    } catch (err) {
      console.error(err)
      throw err
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

      return await DynamoDB.createTable(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  deleteTable: async function (tableName) {
    try {
      return await DynamoDB.deleteTable({ TableName: tableName }).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  manageItem: async function (tableName, item) {
    try {
      const params = {
        TableName: tableName,
        'Item': marshall(item)
      }
      return await DynamoDB.putItem(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  deleteItem: async function (tableName, keyData) {
    try {
      const params = {
        TableName: tableName,
        'Key': marshall(keyData)
      }
      return await DynamoDB.deleteItem(params).promise()
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  getItem: async function (tableName, keyData) {
    try {
      const params = {
        TableName: tableName,
        'Key': marshall(keyData)
      }
      const response = await DynamoDB.getItem(params).promise()
      return unmarshall(response.Item || {})
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  scanData: async function (tableName) {
    try {
      const params = {
        TableName: tableName
      }
      const response = await DynamoDB.scan(params).promise()
      return (response.Items || []).map(dt => unmarshall(dt))
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default tablesService