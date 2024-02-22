import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'
import { CreateViewmodel } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_viewmodel'

describe('Assert Create Withdraw usecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)

    const withdraw = await usecase.execute(
      'ABC123',
      '23.00335-9',
      'Lionel Messi',
      1704074148000,
    )

    const viewModel = new CreateViewmodel(withdraw)

    expect(viewModel.toJSON()).toEqual({
      notebookSerialNumber: 'ABC123',
      studentRA: '',
      initTime: 0,
      finishTime: 0,
      state: STATE.PENDING,
      message: 'The withdraw was created successfully',
    })
  })
})
