import { describe, it, expect } from 'vitest'
import { UpdateWithdrawController } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_controller'
import { UpdateWithdraw } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_usecase'
import { IRequest } from '../../../../../src/shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  OK,
  Unauthorized,
} from '../../../../../src/shared/helpers/external_interfaces/http_codes'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'

describe('UpdateWithdrawController Tests', () => {
  it('Should update withdraw state successfully when user is admin', async () => {
    const request: IRequest = {
      data: {
        notebookSerialNumber: 'ABC123',
        state: true,
      },
    }
    const user = {
      role: 'ADMIN',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(OK)
    const responseBody = response.body
    expect(responseBody.message).toBe('The withdraw was updated successfully')
  })

  it('Should return Unauthorized when user is not authenticated', async () => {
    const request: IRequest = {
      data: {
        notebookSerialNumber: 'ABC123',
        state: true,
      },
    }
    const user = null

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe(
      'This action is forbidden for only admins',
    )
  })

  it('Should return Unauthorized when user is not admin or employee', async () => {
    const request: IRequest = {
      data: {
        notebookSerialNumber: 'ABC123',
        state: true,
      },
    }
    const user = {
      role: 'CUSTOMER',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(Unauthorized)
    expect(response?.body).toBe('This action is forbidden for only admins')
  })

  it('Should return BadRequest when notebookSerialNumber is missing', async () => {
    const request: IRequest = {
      data: {
        state: true,
      },
    }
    const user = {
      role: 'ADMIN',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(BadRequest)
    expect(expect(response?.body)).toBe(
      'notebookSerialNumber parameter is missing',
    )
  })

  it('Should return BadRequest when notebookSerialNumber is not a string', async () => {
    const request: IRequest = {
      data: {
        notebookSerialNumber: 123,
        state: true,
      },
    }
    const user = {
      role: 'ADMIN',
    }

    const repo = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdraw(repo)
    const controller = new UpdateWithdrawController(usecase)

    const response = await controller.handle(request, user)

    expect(response).toBeInstanceOf(BadRequest)
    expect(response?.body).toBe(
      'notebookSerialNumber parameter must be a string',
    )
  })
})
