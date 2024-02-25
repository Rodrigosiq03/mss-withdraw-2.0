/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserFromToken } from '../../../../../src/shared/middlewares/jwt_middleware'
import { Environments } from '../../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../../shared/helpers/external_interfaces/http_lambda_requests'
import { GetWithdrawByNotebookSerialNumberController } from './get_withdraw_controller'
import { GetWithdrawUseCase } from './get_withdraw_usecase'

const repo = Environments.getWithdrawRepo()
const usecase = new GetWithdrawUseCase(repo)
const controller = new GetWithdrawByNotebookSerialNumberController(usecase)

export async function GetWithdrawByNotebookSerialNumberPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const decoded = getUserFromToken(httpRequest)
  const response = await controller.handle(httpRequest, decoded)
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers,
  )

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await GetWithdrawByNotebookSerialNumberPresenter(event)
  return response
}
