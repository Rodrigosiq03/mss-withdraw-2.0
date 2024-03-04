import { describe, it, expect } from 'vitest'
import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import {
  GetAllWithdrawsViewModel,
  WithdrawViewModel,
} from '../../../../src/modules/get_all_withdraw/app/get_all_withdraw_viewmodel'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Get All Withdraws viewmodel is correct at all', () => {
  const withdraws = [
    new Withdraw({
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      name: 'John Doe',
      initTime: 1641006000000,
      state: STATE.PENDING,
    }),
    new Withdraw({
      notebookSerialNumber: 'XYZ456',
      studentRA: '78.90123-4',
      name: 'Jane Smith',
      initTime: 1641006000000,
      state: STATE.APPROVED,
    }),
  ]

  it('Should activate GetAllWithdraws viewmodel correctly', async () => {
    const viewmodel = new GetAllWithdrawsViewModel(withdraws)

    const expected = {
      withdraws: [
        {
          notebookSerialNumber: 'ABC123',
          studentRA: '23.00335-9',
          name: 'John Doe',
          initTime: 1641006000000,
          finishTime: undefined,
          state: STATE.PENDING,
        },
        {
          notebookSerialNumber: 'XYZ456',
          studentRA: '78.90123-4',
          name: 'Jane Smith',
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
    const viewmodel = new WithdrawViewModel(withdraws[0])

    const expected = {
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      name: 'John Doe',
      initTime: 1641006000000,
      finishTime: undefined,
      state: STATE.PENDING,
    }

    expect(viewmodel.toJSON()).toEqual(expected)
  })
})
