import { describe, it, expect } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'
import { HttpRequest } from '../../../../../src/shared/helpers/external_interfaces/http_models'
import { CreateWithdrawController } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_controller'

describe('Assert Create Withdraw controller is correct at all', () => {
  it('Should activate controller correctly', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(201)
    expect(response?.body['withdrawId']).toEqual('1')
    expect(response?.body['notebookSerialNumber']).toEqual('ABC123')
    expect(response?.body['studentRA']).toEqual('23.00335-9')
    expect(response?.body['initTime']).toEqual(1704074148000)
    expect(response?.body['message']).toEqual(
      'The withdraw was created successfully',
    )
  })

  it('Should throw 400 statusCode when not pass withdrawId', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field withdrawId is missing')
  })
  it('Should throw 400 statusCode when not pass notebookSerialNumber', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      withdrawId: '1',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field notebookSerialNumber is missing')
  })
  it('Should throw 400 statusCode when not pass studentRA', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      initTime: 1704074148000,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field studentRA is missing')
  })
  it('Should throw 400 statusCode when not pass initTime', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field initTime is missing')
  })
  it('Should throw 400 statusCode when pass withdrawId incorrect type', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new CreateWithdrawUsecase(repo)
    const controller = new CreateWithdrawController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      withdrawId: 1,
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe(
      'Field withdrawId isn\'t in the right type.\n Received: number.\n Expected: string.',
    )
  })
})
