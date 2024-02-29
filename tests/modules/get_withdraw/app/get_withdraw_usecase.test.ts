import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetWithdrawUseCase } from '../../../../src/modules/get_withdraw/app/get_withdraw_usecase'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('Assert Get Withdraw usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)

    const withdraw = await usecase.execute('GHI789')

    expect(withdraw.props).toEqual({
      notebookSerialNumber: 'GHI789',
      studentRA: '23.00555-7',
      name: 'Matue',
      initTime: 1704074148000,
      state: STATE.PENDING,
    })
  })
})
