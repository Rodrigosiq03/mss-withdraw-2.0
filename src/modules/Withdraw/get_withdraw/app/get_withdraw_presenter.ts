/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Environments } from '../../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../../shared/helpers/external_interfaces/http_lambda_requests'
import { GetWithdrawByRAController } from './get_withdraw_controller'
import { GetWithdrawUseCase } from './get_withdraw_usecase'

const repo = Environments.getWithdrawRepo()
const usecase = new GetWithdrawUseCase(repo)
const controller = new GetWithdrawByRAController(usecase)

export async function getWithdrawByRAPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const response = await controller.handle(httpRequest)
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers,
  )

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await getWithdrawByRAPresenter(event)
  return response
}
