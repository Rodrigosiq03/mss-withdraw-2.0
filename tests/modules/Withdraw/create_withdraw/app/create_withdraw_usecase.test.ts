import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'

describe('Assert Create Withdraw usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)

    const withdraw = await usecase.execute(
      '1',
      'ABC123',
      '23.00335-9',
      1704074148000,
    )

    expect(withdraw.props).toEqual({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      state: STATE.PENDING,
    })
  })
})
