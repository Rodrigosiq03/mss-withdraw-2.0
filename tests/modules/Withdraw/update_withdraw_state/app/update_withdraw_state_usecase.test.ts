import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { UpdateWithdraw } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_usecase'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

describe('Assert Update Withdraw usecase is correct at all', () => {
  it('Should update withdraw state correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)

    const ra = '23.00555-7'
    const isChecked = true
    const updatedWithdraw = await usecase.execute(ra, isChecked)

    expect(updatedWithdraw.state).toEqual(STATE.APPROVED)
  })
})
