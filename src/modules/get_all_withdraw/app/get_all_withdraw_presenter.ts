/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserFromToken } from '../../../shared/middlewares/jwt_middleware'
import { Environments } from '../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { GetAllWithdrawsController } from './get_all_withdraw_controller'
import { GetAllWithdrawsUsecase } from './get_all_withdraw_usecase'

const repo = Environments.getWithdrawRepo()
const usecase = new GetAllWithdrawsUsecase(repo)
const controller = new GetAllWithdrawsController(usecase)

export async function getAllWithdrawsPresenter(event: Record<string, any>) {
  const httpRequest = new LambdaHttpRequest(event)
  const decoded = getUserFromToken(httpRequest.data.Authorization)
  const response = await controller.handle(httpRequest, decoded)
  const httpResponse = new LambdaHttpResponse(
    response?.body,
    response?.statusCode,
    response?.headers,
  )

  return httpResponse.toJSON()
}

export async function handler(event: any, context: any) {
  const response = await getAllWithdrawsPresenter(event)
  return response
}
