import { describe, it, expect } from 'vitest'
import { UpdateWithdrawViewModel } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_viewmodel'
import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

describe('Assert Update Withdraw viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00555-7',
      name: 'Test User',
      initTime: 1704074148000,
      finishTime: 1704074149000,
      state: STATE.APPROVED,
    })

    const withdrawViewModel = new UpdateWithdrawViewModel(
      withdraw.props,
    ).toJSON()

    expect(withdrawViewModel).toEqual({
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00555-7',
      name: 'Test User',
      initTime: 1704074148000,
      finishTime: 1704074149000,
      state: STATE.APPROVED,
      message: 'The withdraw was updated successfully',
    })
  })
})
