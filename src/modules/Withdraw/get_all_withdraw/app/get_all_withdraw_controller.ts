/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { GetAllWithdrawsUsecase } from './get_all_withdraw_usecase'
import { GetAllWithdrawViewmodel } from './get_all_withdraw_viewmodel'
import {
  LambdaHttpRequest,
  LambdaHttpResponse,
} from '../../../../shared/helpers/external_interfaces/http_lambda_requests'
import {
  OK,
  NotFound,
  BadRequest,
  InternalServerError,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { IRequest } from '@/shared/helpers/external_interfaces/external_interface'

export class GetAllWithdrawsController {
  constructor(private usecase: GetAllWithdrawsUsecase) {}

  async handle(request: IRequest) {
    try {
      const withdraws = await this.usecase.execute()
      const viewModel = new GetAllWithdrawViewmodel(withdraws)
      return new OK(viewModel.toJSON())
    } catch (error: any) {
      if (
        error instanceof NotFound ||
        error instanceof BadRequest ||
        error instanceof InternalServerError
      ) {
        return error
      } else {
        return new InternalServerError(error.message)
      }
    }
  }
}
