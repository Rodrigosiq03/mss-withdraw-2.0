/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../../src/shared/environments'
import { Withdraw } from '../../../shared/domain/entities/withdraw'
import { IWithdrawRepository } from '../../../shared/domain/repositories/withdraw_repository_interface'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'
import { WithdrawDynamoDTO } from '../dto/withdraw_dynamo_dto'
import { STATE } from '../../../shared/domain/enums/state_enum'
import { WithdrawHistoryRepositoryDynamo } from './withdraw_history_repository_dynamo'
import {
  WithdrawInUse,
  FinishWithdrawStateInvalid,
  UpdateWithdrawStateInvalid,
  AlreadyGotWithdraw,
} from '../../../shared/helpers/errors/withdraw_errors'

export class WithdrawRepositoryDynamo implements IWithdrawRepository {
  static partitionKeyFormat(notebookSerialNumber: string): string {
    return `withdraw#${notebookSerialNumber}`
  }

  static sortKeyFormat(notebookSerialNumber: string): string {
    return `#${notebookSerialNumber}`
  }

  constructor(
    private dynamo: DynamoDatasource = new DynamoDatasource(
      Environments.getEnvs().dynamoTableName,
      Environments.getEnvs().dynamoPartitionKey,
      Environments.getEnvs().region,
      undefined,
      undefined,
      Environments.getEnvs().endpointUrl,
      Environments.getEnvs().dynamoSortKey,
    ),
  ) {}

  async addWithdraw(withdraw: Withdraw): Promise<Withdraw> {
    withdraw.setFinishTime(null)
    withdraw.setInitTime(null)
    withdraw.setName(null)
    withdraw.setStudentRA(null)
    console.log('withdraw - [ADD WITHDRAW] - ', withdraw)
    const withdrawDto = WithdrawDynamoDTO.fromEntity(withdraw)
    console.log('withdrawDto - [ADD WITHDRAW] - ', withdrawDto)
    const withdrawDynamo = withdrawDto.toDynamo()
    console.log('withdrawDynamo - [ADD WITHDRAW] - ', withdrawDynamo)

    await this.dynamo.putItem(
      withdrawDynamo,
      WithdrawRepositoryDynamo.partitionKeyFormat(
        withdraw.notebookSerialNumber,
      ),
      WithdrawRepositoryDynamo.sortKeyFormat(withdraw.notebookSerialNumber),
    )
    return Promise.resolve(withdrawDto.toEntity())
  }

  async createNotebook(
    notebookSerialNumber: string,
  ): Promise<Withdraw> {
    const withdraw = new Withdraw({
      notebookSerialNumber,
      studentRA: null,
      name: undefined,
      initTime: null,
      finishTime: null,
      state: STATE.INACTIVE,
    })
    const withdrawDto = WithdrawDynamoDTO.fromEntity(withdraw)
    const withdrawDynamo = withdrawDto.toDynamo()

    console.log('createWithdraw - [REPOSITORY] TENTANDO CRIAR AGORA AQUI NO REPO DYNAMO- ', notebookSerialNumber)


    await this.dynamo.putItem(
      withdrawDynamo,
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
    )
    console.log('createWithdraw - [REPOSITORY] CRIOUUUUUU- ', notebookSerialNumber)

    return Promise.resolve(withdrawDto.toEntity())
  }

  deleteNotebook(notebookSerialNumber: string): Promise<void> {
    return this.dynamo.deleteItem(
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
    )
  }

  async createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ): Promise<Withdraw> {
    const withdraw =
      await this.getWithdrawByNotebookSerialNumber(notebookSerialNumber)
      
      if (!withdraw) throw new NoItemsFound('notebookSerialNumber')
        
        if (withdraw.state === STATE.APPROVED || withdraw.state === STATE.PENDING) {
          throw new WithdrawInUse()
        }

    const alreadyGotWithdraw = await this.getWithdrawByStudentRA(studentRA)

    if (alreadyGotWithdraw) throw new AlreadyGotWithdraw()

    const itemToUpdate: Record<string, any> = {}

    itemToUpdate['studentRA'] = studentRA
    itemToUpdate['name'] = name
    itemToUpdate['initTime'] = initTime
    itemToUpdate['state'] = STATE.PENDING

    const result = await this.dynamo.updateItem(
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
      itemToUpdate,
    )

    const withdrawDto = WithdrawDynamoDTO.fromDynamo(
      result['Attributes'],
    ).toEntity()

    return Promise.resolve(withdrawDto)
  }
  async getWithdrawByStudentRA(
    studentRA: string,
  ): Promise<Withdraw | undefined> {
    const resp = await this.dynamo.getAllItems()
    if (!resp['Items']) {
      throw new NoItemsFound('this dynamo table')
    }

    console.log('getWithdrawByStudentRA - ', resp['Items'])

    for (const withdrawDynamo of resp['Items']) {
      const withdrawDto = WithdrawDynamoDTO.fromDynamo(withdrawDynamo)
      const withdrawEntity = withdrawDto.toEntity()
      if (withdrawEntity.studentRA === studentRA) {
        return Promise.resolve(withdrawEntity)
      }
    }
    return Promise.resolve(undefined)
  }
  async getWithdrawByNotebookSerialNumber(
    notebookSerialNumber: string,
  ): Promise<Withdraw> {
    const repo = await this.dynamo.getItem(
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
    )
    if (!repo['Item']) {
      throw new NoItemsFound('notebookSerialNumber')
    }

    const withdrawDto = WithdrawDynamoDTO.fromDynamo(repo['Item']).toEntity()
    return Promise.resolve(withdrawDto)
  }
  async getAllWithdraws(): Promise<Withdraw[]> {
    const resp = await this.dynamo.getAllItems()

    if (!resp['Items']) {
      throw new NoItemsFound('this dynamo table')
    }

    console.log('getAllWithdraws - ', resp['Items'])

    const withdraws: Withdraw[] = []

    for (const withdrawDynamo of resp['Items']) {
      const withdrawDto = WithdrawDynamoDTO.fromDynamo(withdrawDynamo)
      const withdrawEntity = withdrawDto.toEntity()
      withdraws.push(withdrawEntity)
    }

    return Promise.resolve(withdraws)
  }
  async updateWithdrawByNotebookSerialNumber(
    notebookSerialNumber: string,
    isChecked: boolean,
  ): Promise<Withdraw> {
    const withdraw =
      await this.getWithdrawByNotebookSerialNumber(notebookSerialNumber)

    if (!withdraw) throw new NoItemsFound('notebookSerialNumber')

    if (
      withdraw.state === STATE.INACTIVE ||
      withdraw.state === STATE.APPROVED
    ) {
      throw new UpdateWithdrawStateInvalid()
    }

    const itemToUpdate: Record<string, any> = {}

    if (isChecked === true) {
      itemToUpdate['state'] = STATE.APPROVED
    } else {
      itemToUpdate['state'] = STATE.INACTIVE
      itemToUpdate['studentRA'] = null
      itemToUpdate['name'] = null
      itemToUpdate['initTime'] = null
      itemToUpdate['finishTime'] = null
    }

    const result = await this.dynamo.updateItem(
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
      itemToUpdate,
    )

    const withdrawDto = WithdrawDynamoDTO.fromDynamo(
      result['Attributes'],
    ).toEntity()

    return Promise.resolve(withdrawDto)
  }
  async finishWithdrawByNotebookSerialNumber(
    notebookSerialNumber: string,
  ): Promise<Withdraw> {
    const withdraw =
      await this.getWithdrawByNotebookSerialNumber(notebookSerialNumber)

    if (!withdraw) throw new NoItemsFound('notebookSerialNumber')

    if (withdraw.state === STATE.INACTIVE || withdraw.state === STATE.PENDING) {
      throw new FinishWithdrawStateInvalid()
    }

    const withdrawHistoryRepo = new WithdrawHistoryRepositoryDynamo()
    withdraw.setFinishTime(new Date().getTime())
    console.log('withdraw - [FINISH WITHDRAW] - ', withdraw)
    withdrawHistoryRepo.addWithdrawHistory(withdraw)

    const itemToUpdate: Record<string, any> = {}

    itemToUpdate['studentRA'] = null
    itemToUpdate['name'] = null
    itemToUpdate['initTime'] = null
    itemToUpdate['finishTime'] = null
    itemToUpdate['state'] = STATE.INACTIVE

    const result = await this.dynamo.updateItem(
      WithdrawRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      WithdrawRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
      itemToUpdate,
    )
    const withdrawDto = WithdrawDynamoDTO.fromDynamo(
      result['Attributes'],
    ).toEntity()
    return Promise.resolve(withdrawDto)
  }
}
