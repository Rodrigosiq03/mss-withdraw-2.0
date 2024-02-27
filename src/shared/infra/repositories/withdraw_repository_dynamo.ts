/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '@/shared/environments'
import { Withdraw } from '../../../shared/domain/entities/withdraw'
import { IWithdrawRepository } from '../../../shared/domain/repositories/withdraw_repository_interface'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { NoItemsFound } from '@/shared/helpers/errors/usecase_errors'
import { WithdrawDynamoDTO } from '../dto/withdraw_dynamo_dto'
import { STATE } from '@/shared/domain/enums/state_enum'

export class WithdrawRepositoryDynamo implements IWithdrawRepository {
  static partitionKeyFormat(notebookSerialNumber: string): string {
    return `withdraw#${notebookSerialNumber}`
  }

  static sortKeyFormat(notebookSerialNumber: string): string {
    return `#${notebookSerialNumber}`
  }

  constructor(private dynamo: DynamoDatasource = new DynamoDatasource(
    Environments.getEnvs().dynamoTableName,
    Environments.getEnvs().dynamoPartitionKey,
    Environments.getEnvs().region, undefined, undefined, Environments.getEnvs().endpointUrl, Environments.getEnvs().dynamoSortKey
  )) { }


  async createWithdraw(notebookSerialNumber: string, studentRA: string, name: string, initTime: number): Promise<Withdraw> {
    const resp = await this.dynamo.getItem(WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber), WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber))

    if (!resp['Item']) {
      throw new NoItemsFound('notebookSerialNumber')
    }

    const itemToUpdate: Record<string, any> = {}

    // const updateds = {
    //   studentRA,
    //   name,
    //   initTime
    // }

    itemToUpdate['studentRA'] = studentRA
    itemToUpdate['name'] = name
    itemToUpdate['initTime'] = initTime
    itemToUpdate['state'] = STATE.PENDING

    const result = await this.dynamo.updateItem(WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber), WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber), itemToUpdate)

    const withdrawDto = WithdrawDynamoDTO.fromDynamo(result['Attributes']).toEntity()

    return Promise.resolve(withdrawDto)

  }
  getWithdrawByNotebookSerialNumber(notebookSerialNumber: string): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  async getAllWithdraws(): Promise<Withdraw[]> {
    const resp = await this.dynamo.getAllItems()

    if (!resp['Ítems']) {
      throw new NoItemsFound('this dynamo table')
    }

    const withdraws: Withdraw[] = []

    for (const withdrawDynamo in resp['Items']) {
      const withdrawDto = WithdrawDynamoDTO.fromDynamo(withdrawDynamo)
      const withdrawEntity = withdrawDto.toEntity()
      withdraws.push(withdrawEntity)
    }

    return Promise.resolve(withdraws)
  }
  async updateWithdrawByNotebookSerialNumber(notebookSerialNumber: string, isChecked: boolean): Promise<Withdraw> {
    const resp = await this.dynamo.getItem(WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber), WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber))

    if (!resp['Item']) {
      throw new NoItemsFound('notebookSerialNumber')
    }

    const itemToUpdate: Record<string, any> = {}

    if (isChecked === true) {
      itemToUpdate['state'] = STATE.APPROVED
    } else {
      itemToUpdate['state'] = STATE.INACTIVE
    }

    const result = await this.dynamo.updateItem(WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber), WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber), itemToUpdate)

    const withdrawDto = WithdrawDynamoDTO.fromDynamo(result['Attributes']).toEntity()

    return Promise.resolve(withdrawDto)

  }
  finishWithdrawByNotebookSerialNumber(notebookSerialNumber: string): Promise<Withdraw> {

  }

}
