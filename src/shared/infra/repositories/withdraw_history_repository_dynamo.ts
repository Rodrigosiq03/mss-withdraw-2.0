import { Withdraw } from '../../../shared/domain/entities/withdraw'
import { Environments } from '../../../shared/environments'
import { WithdrawDynamoDTO } from '../dto/withdraw_dynamo_dto'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { v4 } from 'uuid'

export class WithdrawHistoryRepositoryDynamo {
  static partitionKeyFormat(ra: string): string {
    const uuid = v4()
    return `withdraw#${ra}#${uuid}`
  }

  static sortKeyFormat(ra: string): string {
    return `#${ra}`
  }

  constructor(
    private dynamo: DynamoDatasource = new DynamoDatasource(
      Environments.getEnvs().dynamoTableNameHistory,
      Environments.getEnvs().dynamoPartitionKey,
      Environments.getEnvs().region,
      undefined,
      undefined,
      Environments.getEnvs().endpointUrl,
      Environments.getEnvs().dynamoSortKey,
    ),
  ) {}

  async addWithdrawHistory(withdraw: Withdraw): Promise<boolean> {
    const withdrawDTO = WithdrawDynamoDTO.fromEntity(withdraw)
    const withdrawDynamo = withdrawDTO.toDynamo()

    console.log('withdrawDynamoHistory - [ADD WIHTDRAW HISTORY]', withdrawDynamo)

    if (withdraw.studentRA === undefined) {
      throw new Error('Student RA is undefined')
    }

    await this.dynamo.putItem(
      withdrawDynamo,
      WithdrawHistoryRepositoryDynamo.partitionKeyFormat(
        withdraw.studentRA!,
      ),
      WithdrawHistoryRepositoryDynamo.sortKeyFormat(
        withdraw.studentRA!,
      ),
    )

    return Promise.resolve(true)
  }
}
