/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { GetAllWithdrawsUsecase } from './get_all_withdraw_usecase'
import { GetAllWithdrawViewmodel } from './get_all_withdraw_viewmodel'
import {
  OK,
  NotFound,
  BadRequest,
  InternalServerError,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { IRequest } from '@/shared/helpers/external_interfaces/external_interface'
import { EntityError } from '@/shared/helpers/errors/domain_errors'
import {
  MissingParameters,
  WrongTypeParameters,
} from '@/shared/helpers/errors/controller_errors'

export class GetAllWithdrawsController {
  constructor(private usecase: GetAllWithdrawsUsecase) {}

  async handle(request: IRequest) {
    try {
      const withdraws = await this.usecase.execute()
      const viewModel = new GetAllWithdrawViewmodel(withdraws)
      return new OK(viewModel.toJSON())
    } catch (error) {
      const err = error as Error
      if (
        err instanceof NotFound ||
        err instanceof BadRequest ||
        err instanceof InternalServerError
      ) {
        return this.handleKnownErrors(err)
      } else {
        return new InternalServerError(err.message)
      }
    }
  }

  private handleKnownErrors(error: Error) {
    if (
      error instanceof MissingParameters ||
      error instanceof WrongTypeParameters ||
      error instanceof EntityError
    ) {
      return new BadRequest(error.message)
    }
    return error
  }
}
