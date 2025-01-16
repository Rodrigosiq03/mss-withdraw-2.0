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

const repo = Environments.getWithdrawRepo()
const usecase = new CreateNotebookUsecase(repo)
const controller = new CreateNotebookController(usecase)

export async function createNotebookPresenter(event: Record<string, any>) {
  console.log('ENTROU NO PRESENTER')
  const httpRequest = new LambdaHttpRequest(event)
  console.log('httpRequest DENTRO DO PRESENTER', httpRequest)
  const decoded = getUserFromToken(httpRequest.data.Authorization)
  console.log('DECODED DENTRO DO PRESENTER', decoded)
  console.log('vou chamar CONTROLLER DENTRO DO PRESENTER', controller)
  const response = await controller.handle(httpRequest, decoded)
  console.log('response DENTRO DO PRESENTER', response)
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