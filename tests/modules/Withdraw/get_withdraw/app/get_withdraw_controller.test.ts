import { it, expect, describe } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetWithdrawUseCase } from '../../../../../src/modules/Withdraw/get_withdraw/app/get_withdraw_usecase'
import { GetWithdrawByRAController } from '../../../../../src/modules/Withdraw/get_withdraw/app/get_withdraw_controller'
import { HttpRequest } from '../../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Get All Withdraws controller is correct at all', () => {
  it('Assert Get All Withdraws controller is correct when creating', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByRAController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      studentRA: '23.00555-7',
    })

    const response = await controller.handle(request, undefined)

    expect(response?.statusCode).toEqual(200)
    expect(response?.body['notebookSerialNumber']).toEqual('GHI789')
    expect(response?.body['studentRA']).toEqual('23.00555-7')
    expect(response?.body['name']).toEqual('Matue')
    expect(response?.body['initTime']).toEqual(1704074148000)
    expect(response?.body['state']).toEqual('PENDING')
    expect(response?.body['message']).toEqual(
      'Withdraw has been retrieved successfully',
    )
  })

  it('Assert Get All Withdraws controller is not correct when not pass studentRA', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByRAController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      studentRA: undefined,
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field studentRA is missing')
  })

  it('Assert Get All Withdraws controller is not correct when pass studentRA with wrong type', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByRAController(usecase)

    const request = new HttpRequest(undefined, undefined, { studentRA: 1 })

    const response = await controller.handle(request)
    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe(
      'Field studentRA isn\'t in the right type.\n Received: number.\n Expected: string.',
    )
  })
  it('Assert Get All Withdraws controller is not correct when pass a not found studentRA value', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByRAController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      studentRA: '22.00000-0',
    })

    const response = await controller.handle(request)

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toBe('No items found for studentRA')
  })
})
