import { describe, it, expect } from 'vitest'
import { FinishWithdrawViewModel } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_viewmodel'

describe('Assert Finish Withdraw viewmodel is correct at all', () => {
  it('Should finish viewmodel correctly', async () => {
    const withdrawViewModel = new FinishWithdrawViewModel().toJSON()

    expect(withdrawViewModel).toEqual({
      message: 'The withdraw finished successfully',
    })
  })
})
