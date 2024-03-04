import { it, expect, describe } from 'vitest'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { GetWithdrawUseCase } from '../../../../src/modules/get_withdraw/app/get_withdraw_usecase'
import { GetWithdrawByNotebookSerialNumberController } from '../../../../src/modules/get_withdraw/app/get_withdraw_controller'
import { HttpRequest } from '../../../../src/shared/helpers/external_interfaces/http_models'

describe('Assert Get Withdraw controller is correct at all', () => {
  it('Assert Get Withdraw controller is correct when notebook serial number exists', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByNotebookSerialNumberController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      notebookSerialNumber: 'GHI789',
    })

    const response = await controller.handle(request, { role: 'EMPLOYEE' })

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

  it('Assert Get Withdraw controller returns 400 when notebook serial number is missing', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByNotebookSerialNumberController(usecase)

    const request = new HttpRequest()

    const response = await controller.handle(request, { role: 'EMPLOYEE' })

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe('Field notebookSerialNumber is missing')
  })

  it('Assert Get Withdraw controller returns 400 when notebook serial number has wrong type', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByNotebookSerialNumberController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      notebookSerialNumber: 1,
    })

    const response = await controller.handle(request, { role: 'EMPLOYEE' })

    expect(response?.statusCode).toEqual(400)
    expect(response?.body).toBe(
      'Field notebookSerialNumber isn\'t in the right type.\n Received: number.\n Expected: string.',
    )
  })

  it('Assert Get Withdraw controller returns 404 when notebook serial number does not exist', async () => {
    const repo = new WithdrawRepositoryMock()
    const usecase = new GetWithdrawUseCase(repo)
    const controller = new GetWithdrawByNotebookSerialNumberController(usecase)

    const request = new HttpRequest(undefined, undefined, {
      notebookSerialNumber: 'XYZ123',
    })

    const response = await controller.handle(request, { role: 'EMPLOYEE' })

    expect(response?.statusCode).toEqual(404)
    expect(response?.body).toBe('No items found for notebookSerialNumber')
  })
})
