import { describe, it, expect } from 'vitest'
import { WithdrawDynamoDTO } from '../../../../src/shared/infra/dto/withdraw_dynamo_dto'
import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('[WithdrawDynamoDto]', () => {
  it('[FROM-ENTITY] should return a WithdrawDynamoDto', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: '34565',
      state: STATE.INACTIVE
    })

    const withdrawDynamoDto = WithdrawDynamoDTO.fromEntity(withdraw)

    expect(withdrawDynamoDto).toEqual({
      notebookSerialNumber: '34565',
      state: STATE.INACTIVE
    })
  })

  it('[TO-DYNAMO] should return a WithdrawDynamoDto', () => {
    const withdrawDynamoDto = new WithdrawDynamoDTO({
      notebookSerialNumber: '34565',
      state: STATE.INACTIVE
    })

    const withdrawDynamo = withdrawDynamoDto.toDynamo()

    expect(withdrawDynamo).toEqual({
      'entity': 'withdraw',
      'notebookSerialNumber': '34565',
      'state': STATE.INACTIVE
    })
  })

  it('[FROM-DYNAMO] should return a WithdrawDynamoDto', () => {
    const withdrawDynamo = {'Item': {
      'SK': { 'S': '#34565' },
      'state': { 'S': 'INACTIVE' },
      'PK': { 'S': 'withdraw#34565' },
      'entity': { 'S': 'withdraw' },
      'notebookSerialNumber': { 'S': '34565' },
    }
    }

    const withdrawDynamoDto = WithdrawDynamoDTO.fromDynamo(withdrawDynamo['Item'])

    expect(withdrawDynamoDto).toEqual({
      notebookSerialNumber: '34565',
      state: STATE.INACTIVE
    })
  })
})