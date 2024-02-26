import { describe, it, expect } from 'vitest'
import { UpdateWithdrawViewModel } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_viewmodel'

describe('Assert Update Withdraw viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const withdrawViewModel = new UpdateWithdrawViewModel().toJSON()

    expect(withdrawViewModel).toEqual({
      message: 'The withdraw was updated successfully',
    })
  })
})
