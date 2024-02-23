import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'
import { HttpRequest } from '../../../../../src/shared/helpers/external_interfaces/http_models'
import { CreateWithdrawController } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_controller'

describe('Assert Create Withdraw controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, { notebookSerialNumber: 'ABC123' })

    const decoded = {
      role: 'STUDENT',
      ra: '23.00335-9',
      name: 'Test User',
    }

    const response = await controller.handle(request, decoded)

    expect(response?.statusCode).toEqual(201)
    expect(response?.body['message']).toEqual('The withdraw was created successfully')
  })

  it('Should throw 400 statusCode when not pass notebookSerialNumber', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const user = { name: 'Test User', studentRA: '23.00335-9' }
    const token = jwt.sign({ user }, jwtSecret)

    const request = new HttpRequest(
      undefined,
      { authorization: `Bearer ${token}` },
      {
        studentRA: '23.00335-9',
      },
    )

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field notebookSerialNumber is missing')
  })

  it('Should throw 400 statusCode when not pass studentRA', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const user = { name: 'Test User', studentRA: '23.00335-9' }
    const token = jwt.sign({ user }, jwtSecret)

    const request = new HttpRequest(
      undefined,
      { authorization: `Bearer ${token}` },
      {
        notebookSerialNumber: 'ABC123',
      },
    )

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field studentRA is missing')
  })

  it('Should throw 400 statusCode when studentRA is not valid', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const user = { name: 'Test User', studentRA: '23.00335-9' }
    const token = jwt.sign({ user }, jwtSecret)

    const request = new HttpRequest(
      undefined,
      { authorization: `Bearer ${token}` },
      {
        notebookSerialNumber: 'ABC123',
        studentRA: '22003359',
      },
    )

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Invalid studentRA format')
  })
})
