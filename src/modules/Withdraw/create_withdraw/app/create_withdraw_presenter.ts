/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../../shared/helpers/external_interfaces/http_lambda_requests'
import { CreateWithdrawController } from './create_withdraw_controller'
import { CreateWithdrawUsecase } from './create_withdraw_usecase'

const repo = Environments.getWithdrawRepo()
const usecase = new CreateWithdrawUsecase(repo)
const controller = new CreateWithdrawController(usecase)

export async function createWithdrawPresenter(event: Record<string, any>) {
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
  const response = await createWithdrawPresenter(event)
  return response
}
