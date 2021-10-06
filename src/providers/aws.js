import AWS from 'aws-sdk'

let config = {
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.REACT_APP_AWS_DYNAMO_DB_URL,
}

AWS.config.update(config)
let DynamoDB = new AWS.DynamoDB()

const unmarshall = (data) => AWS.DynamoDB.Converter.unmarshall(data)

export {DynamoDB, unmarshall}