import { describe, it, expect } from 'vitest'
import { FinishWithdrawController } from '../../../../src/modules/finish_withdraw/app/finish_withdraw_controller' 
import { FinishWithdrawUsecase } from '../../../../src/modules/finish_withdraw/app/finish_withdraw_usecase'
import {
  OK,
  Unauthorized
} from '../../../../src/shared/helpers/external_interfaces/http_codes'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('FinishWithdrawController Tests', () => {
  it('Should finish withdraw successfully when user is admin', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'GHI789' })
    const user = {
      role: 'EMPLOYEE',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new FinishWithdrawUsecase(repo)
    const controller = new FinishWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(OK)
    const responseBody = response.body
    expect(responseBody.message).toBe('The withdraw finished successfully')
  })

  it('Should return Unauthorized when user is not authenticated', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'GHI789' })

    const repo = new WithdrawRepositoryMock()
    const usecase = new FinishWithdrawUsecase(repo)
    const controller = new FinishWithdrawController(usecase)

    const response = await controller.handle(request, undefined)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe('The action is forbidden for this type of user')
  })

  it('Should return Unauthorized when user is not admin or employee', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'GHI789' })
    const user = {
      role: 'STUDENT',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new FinishWithdrawUsecase(repo)
    const controller = new FinishWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe('The action is forbidden for this type of user')
  })
})
