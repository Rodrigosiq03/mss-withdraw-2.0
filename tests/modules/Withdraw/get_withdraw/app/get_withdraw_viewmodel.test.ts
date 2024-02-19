import { it, expect, describe } from 'vitest'
import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw' 
import { STATE } from '../../../../../src/shared/domain/enums/state_enum' 
import { WithdrawViewModel } from '../../../../../src/modules/Withdraw/get_withdraw/app/get_withdraw_viewmodel'


describe('Assert Get Withdraw viewmodel is correct at all', () => {
  it('Assert the viewmodel is correct at all', () => {
    const withdraw = new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      state: STATE.PENDING,
    })

    const withdrawViewmodel = new WithdrawViewModel(withdraw).toJSON()

    expect(withdrawViewmodel).toEqual({
      'id': '1',
      'notebookSerialNumber': 'ABC123',
      'studentRA': '23.00335-9',
      'initTime': 1704074148000,
      'state': 'PENDING',
      'finishTime': undefined,
      'message': 'Withdraw has been retrieved successfully'
    })
  })
})
