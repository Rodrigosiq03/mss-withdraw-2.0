import { Withdraw } from '../../../shared/domain/entities/withdraw'
import { Environments } from '../../../shared/environments'
import { WithdrawDynamoDTO } from '../dto/withdraw_dynamo_dto'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'

export class WithdrawHistoryRepositoryDynamo {
  static partitionKeyFormat(notebookSerialNumber: string): string {
    return `withdraw#${notebookSerialNumber}`
  }

  static sortKeyFormat(notebookSerialNumber: string): string {
    return `#${notebookSerialNumber}`
  }

  constructor(private dynamo: DynamoDatasource = new DynamoDatasource(
    Environments.getEnvs().dynamoTableNameHistory, 
    Environments.getEnvs().dynamoPartitionKey, 
    Environments.getEnvs().region, undefined, undefined, Environments.getEnvs().endpointUrl, Environments.getEnvs().dynamoSortKey
  )) {}

  async addWithdrawHistory(withdraw: Withdraw): Promise<boolean> {

    const withdrawDTO = WithdrawDynamoDTO.fromEntity(withdraw)

    await this.dynamo.putItem(withdrawDTO.toDynamo(), WithdrawHistoryRepositoryDynamo.partitionKeyFormat(withdraw.notebookSerialNumber), WithdrawHistoryRepositoryDynamo.sortKeyFormat(withdraw.notebookSerialNumber))

    return Promise.resolve(true)
  }
}