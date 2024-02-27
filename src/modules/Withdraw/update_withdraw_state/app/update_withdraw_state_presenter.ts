/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserFromToken } from '../../../../../src/shared/middlewares/jwt_middleware'
import { Environments } from '../../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../../shared/helpers/external_interfaces/http_lambda_requests'
import { UpdateWithdrawController } from './update_withdraw_state_controller'
import { UpdateWithdrawUsecase } from './update_withdraw_state_usecase'

const repo = Environments.getWithdrawRepo()
const usecase = new UpdateWithdrawUsecase(repo)
const controller = new UpdateWithdrawController(usecase)

export async function updateWithdrawStatePresenter(event: Record<string, any>) {
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
  const response = await updateWithdrawStatePresenter(event)
  return response
}
