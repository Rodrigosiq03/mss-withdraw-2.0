import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { FinishWithdrawUsecase } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_usecase'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

describe('Assert Finish Withdraw usecase is correct at all', () => {
  it('Should finish withdraw correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new FinishWithdrawUsecase(repo)

    const notebookSerialNumber = 'GHI789'
    const updatedWithdraw = await usecase.execute(notebookSerialNumber)

    expect(updatedWithdraw.state).toEqual(STATE.INACTIVE)
  })
})
