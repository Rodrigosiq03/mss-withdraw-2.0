import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetAllWithdrawsUsecase } from '../../../../src/modules/get_all_withdraw/app/get_all_withdraw_usecase'
import { GetAllWithdrawsController } from '../../../../src/modules/get_all_withdraw/app/get_all_withdraw_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Get All Withdraws controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetAllWithdrawsUsecase(repo)
    const controller = new GetAllWithdrawsController(usecase)
    const request = new HttpRequest({}, {}, {})

    const response = await controller.handle(request)

    expect(response?.statusCode).toBe(200)
    expect(response?.body['message']).toBe(
      'All withdraws have been retrieved successfully',
    )
  })
})
