import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetAllWithdrawsUsecase } from '../../../../../src/modules/Withdraw/get_all_withdraw/app/get_all_withdraw_usecase'

describe('Assert Get All Withdraws usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetAllWithdrawsUsecase(repo)

    const withdraws = await usecase.execute()

    expect(withdraws.length).toBe(2) // Adjust hereeee!!!!!! TROPA
  })
})
