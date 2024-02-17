import { describe, it, expect } from 'vitest'
import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import {
  GetAllWithdrawViewmodel,
  WithdrawViewmodel,
} from '../../../../../src/modules/Withdraw/get_all_withdraw/app/get_all_withdraw_viewmodel'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

describe('Assert Get All Withdraws viewmodel is correct at all', () => {
  const withdraws = [
    new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1641006000000,
      state: STATE.PENDING,
    }),
    new Withdraw({
      withdrawId: '2',
      notebookSerialNumber: 'XYZ456',
      studentRA: '78.90123-4',
      initTime: 1641006000000,
      state: STATE.APPROVED,
    }),
  ]

  it('Should activate GetAllWithdraws viewmodel correctly', async () => {
    const viewmodel = new GetAllWithdrawViewmodel(withdraws)

    const expected = {
      withdraws: [
        {
          id: '1',
          notebookSerialNumber: 'ABC123',
          studentRA: '23.00335-9',
          initTime: 1641006000000,
          finishTime: undefined,
          state: STATE.PENDING,
        },
        {
          id: '2',
          notebookSerialNumber: 'XYZ456',
          studentRA: '78.90123-4',
          initTime: 1641006000000,
          finishTime: undefined,
          state: STATE.APPROVED,
        },
      ],
      message: 'All withdraws have been retrieved successfully',
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })

  it('Should activate Withdraws viewmodel correctly', async () => {
    const viewmodel = new WithdrawViewmodel(withdraws[0])

    const expected = {
      id: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1641006000000,
      finishTime: undefined,
      state: STATE.PENDING,
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })
})
