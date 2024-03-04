/* eslint-disable @typescript-eslint/no-unused-vars */
import * as AWS from 'aws-sdk'

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import {
  DynamoDBClient,
  waitUntilTableExists,
  ListTablesCommand,
  CreateTableCommand,
} from '@aws-sdk/client-dynamodb'

import { Environments } from '../../environments'
import { WithdrawRepositoryMock } from './withdraw_repository_mock'
import { WithdrawRepositoryDynamo } from './withdraw_repository_dynamo'
import { generateAllWithdrawsFromJson } from '../../services/generate_all_withdraws_from_json'
import envs from '../../../..'


async function setupDynamoTable(): Promise<void> {
  const dynamoTableName = envs.DYNAMO_TABLE_NAME
  const dynamoTableNameHistory = envs.DYNAMO_TABLE_NAME_HISTORY
  console.log('dynamoTableName - [SETUP_DYNAMO_TABLE] - ', dynamoTableName)
  console.log('dynamoTableNameHistory - [SETUP_DYNAMO_TABLE] - ', dynamoTableNameHistory)
  // AWS.config.update({ region: 'sa-east-1' })

  if (!dynamoTableName || !dynamoTableNameHistory) {
    throw new Error('DYNAMO_TABLE_NAME or DYNAMO_TABLE_NAME_HISTORY is undefined')
  }

  console.log('Setting up DynamoDB table...')

  const dynamoClient = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'sa-east-1',
  })
  console.log('DynamoDB client created')

  const tables =
    (await dynamoClient.send(new ListTablesCommand({}))).TableNames || []

  if (!tables.includes(dynamoTableName) && !tables.includes(dynamoTableNameHistory)) {
    console.log('Creating tables...')
    await dynamoClient.send(
      new CreateTableCommand({
        TableName: dynamoTableName,
        AttributeDefinitions: [
          { AttributeName: 'PK', AttributeType: 'S' },
          { AttributeName: 'SK', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      }),
    )
    await dynamoClient.send(
      new CreateTableCommand({
        TableName: dynamoTableNameHistory,
        AttributeDefinitions: [
          { AttributeName: 'PK', AttributeType: 'S' },
          { AttributeName: 'SK', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      }),
    )

    console.log('Waiting for tables to be created...')

    await new Promise((resolve) => setTimeout(resolve, 10000))

    await waitUntilTableExists(
      {
        client: dynamoClient,
        maxWaitTime: 200,
      },
      { TableName: dynamoTableName },
    )

    await waitUntilTableExists(
      {
        client: dynamoClient,
        maxWaitTime: 200,
      },
      { TableName: dynamoTableNameHistory },
    )

    console.log(`Table ${envs.DYNAMO_TABLE_NAME} created!`)
    console.log(`Table ${envs.DYNAMO_TABLE_NAME_HISTORY} created!`)
  } else {
    console.log('Table already exists!')
  }
}

async function withdrawsToLocalDynamo() {
  const dynamoRepo = new WithdrawRepositoryDynamo()

  let count = 0
  console.log('Loading withdraws to local DynamoDB...')

  const withdraws = generateAllWithdrawsFromJson()

  for(const withdraw of withdraws) {
    await dynamoRepo.addWithdraw(withdraw)
    count += 1
  }

  console.log(`${count} withdraws loaded to local DynamoDB`)
}

// async function loadMockToRealDynamo() {
//   const mock = new WithdrawRepositoryMock()
//   const dynamoRepo = new WithdrawRepositoryDynamo()

//   let count = 0
//   const dynamoDB = DynamoDBDocument.from(
//     new DynamoDBClient({
//       region: Environments.getEnvs().region,
//       endpoint: Environments.getEnvs().endpointUrl,
//     }),
//   )

//   dynamoDB.put({
//     TableName: Environments.getEnvs().dynamoTableName,
//     Item: {
//       PK: 'COUNTER',
//       SK: 'COUNTER',
//       COUNTER: 0,
//     },
//   })

//   console.log('Loading mock to real DynamoDB...')
//   const withdraws = await mock.getAllWithdraws()

//   for (const withdraw of withdraws) {
//     await dynamoRepo.createWithdraw(
//       withdraw.notebookSerialNumber,
//       withdraw.studentRA ?? '',
//       withdraw.name ?? '',
//       withdraw.initTime ?? 0,
//     )
//     count += 1
//   }

//   console.log(`${count} users loaded to real DynamoDB`)
// }                                                         ----> DEVE SER CORRIJIDO, AGUARDANDO RESPOSTA

// async function main() {
//   try {
//     await setupDynamoTable()
//     await withdrawsToLocalDynamo()
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

if (require.main === module) {
  (async () => {
    await setupDynamoTable()
    // await loadMockToRealDynamo()
    // await loadMockToRealDynamo()
    await withdrawsToLocalDynamo()
  })()
} else {
  (async () => {
    await setupDynamoTable()
    // await loadMockToRealDynamo()
    // await loadMockToRealDynamo()
    await withdrawsToLocalDynamo()
  })()
}
