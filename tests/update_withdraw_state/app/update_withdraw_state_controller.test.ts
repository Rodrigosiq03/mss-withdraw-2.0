import { describe, it, expect } from 'vitest'
import { UpdateWithdrawController } from '../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_controller'
import { UpdateWithdrawUsecase } from '../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_usecase'
import {
  BadRequest,
  OK,
  Unauthorized,
} from '../../../../src/shared/helpers/external_interfaces/http_codes'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('UpdateWithdrawController Tests', () => {
  it('Should update withdraw state successfully when user is admin', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'MNO345', state: true })
    const user = {
      role: 'EMPLOYEE',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(OK)
    const responseBody = response.body
    expect(responseBody.message).toBe('The withdraw state updated successfully')
  })

  it('Should return Unauthorized when user is not authenticated', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'MNO345', state: true })
    

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, undefined)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe(
      'The action is forbidden for this type of user',
    )
  })

  it('Should return Unauthorized when user is not admin or employee', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 'MNO345', state: true })
    const user = {
      role: 'CUSTOMER',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe('The action is forbidden for this type of user')
  })

  it('Should return BadRequest when notebookSerialNumber is missing', async () => {
    const request = new HttpRequest({ state: true })
    const user = {
      role: 'EMPLOYEE',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(BadRequest)
    expect(response?.body).toBe(
      'Field notebookSerialNumber is missing',
    )
  })

  it('Should return BadRequest when notebookSerialNumber is not a string', async () => {
    const request = new HttpRequest({ notebookSerialNumber: 123, state: true })
    const user = {
      role: 'ADMIN',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(BadRequest)
    expect(response?.body).toBe(
      'Field notebookSerialNumber isn\'t in the right type.\n Received: number.\n Expected: string.',
    )
  })
})
