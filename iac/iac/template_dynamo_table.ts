import { Construct } from 'constructs'
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb'
import { RemovalPolicy } from 'aws-cdk-lib'

export class TemplateDynamoTable extends Construct {
  public table: Table

  constructor(scope: Construct, constructId: string, tableName?: string) {
    super(scope, constructId)

    if (!tableName || tableName === undefined || tableName === '') throw new Error('DYNAMO_TABLE_NAME is undefined')

    this.table = new Table(this, constructId, {
      tableName,
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    })
  }
}