/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserFromToken } from '../../../../src/shared/middlewares/jwt_middleware'
import { Environments } from '../../../shared/environments'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../shared/helpers/external_interfaces/http_lambda_requests'
import { CreateNotebookController } from './create_notebook_controller'
import { CreateNotebookUsecase } from './create_notebook_usecase'

const repo = Environments.getNotebookRepo()
const usecase = new CreateNotebookUsecase(repo)
const controller = new CreateNotebookController(usecase)

export async function createNotebookPresenter(event: Record<string, any>) {
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
  const response = await createNotebookPresenter(event)
  return response
}