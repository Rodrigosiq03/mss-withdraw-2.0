import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetWithdrawUseCase } from '../../../../../src/modules/Withdraw/get_withdraw/app/get_withdraw_usecase'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

describe('Assert Get Withdraw usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)

    const withdraw = await usecase.execute('23.00335-9')

    expect(withdraw.props).toEqual({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      state: STATE.PENDING,
    })
  })
})
