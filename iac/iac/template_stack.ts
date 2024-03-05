import { Stack, StackProps } from 'aws-cdk-lib'
import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { TemplateDynamoTable } from './template_dynamo_table'
import { LambdaStack } from './lambda_stack'
import envs from '../../index'

export class TemplateStack extends Stack {
  constructor(scope: Construct, constructId: string, props?: StackProps) {
    super(scope, constructId, props)

    const restApi = new RestApi(this, 'NoteMauaWithdrawRESTAPI', {
      restApiName: 'NoteMauaWithdrawRESTAPI',
      description: 'This is the REST API for the NoteMaua mss withdraw service.',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['*']
      }
    })

    const apigatewayResource = restApi.root.addResource('mss-withdraw', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: Cors.DEFAULT_HEADERS
      }
    })

    const dynamoTable = new TemplateDynamoTable(this, 'WithdrawDynamoTable', process.env.DYNAMO_TABLE_NAME, 'NoteMauaMssWithdrawDynamoTable')
    const dynamoTableHistory = new TemplateDynamoTable(this, 'WithdrawHistoryDynamoTable', process.env.DYNAMO_TABLE_NAME, 'NoteMauaMssWithdrawHistoryDynamoTable')

    const ENVIRONMENT_VARIABLES = {
      'STAGE': envs.STAGE,
      'DYNAMO_TABLE_NAME': envs.DYNAMO_TABLE_NAME,
      'DYNAMO_PARTITION_KEY': 'PK',
      'DYNAMO_SORT_KEY': 'SK',
      'REGION': process.env.REGION,
      'ENDPOINT_URL': process.env.ENDPOINT_URL,
      'DYNAMO_TABLE_NAME_HISTORY': process.env.DYNAMO_TABLE_NAME_HISTORY,
      'JWT_SECRET': process.env.JWT_SECRET,
      'MAIL_USER': process.env.MAIL_USER,
      'MAIL_PASSWORD': process.env.MAIL_PASSWORD
    }

    const lambdaStack = new LambdaStack(this, apigatewayResource, ENVIRONMENT_VARIABLES)

    dynamoTable.table.grantReadWriteData(lambdaStack.getWithdrawFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.createWithdrawFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.finishWithdrawFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.updateWithdrawStateFunction)
    dynamoTable.table.grantReadWriteData(lambdaStack.getAllWithdrawFunction)
    
    dynamoTableHistory.table.grantReadWriteData(lambdaStack.finishWithdrawFunction)
  }
}