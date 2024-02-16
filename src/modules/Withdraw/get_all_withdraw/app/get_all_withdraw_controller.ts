/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetAllWithdrawsUsecase } from './get_all_withdraw_usecase'
import { GetAllWithdrawViewmodel } from './get_all_withdraw_viewmodel'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  OK,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { IRequest } from '@/shared/helpers/external_interfaces/external_interface'
import { EntityError } from '@/shared/helpers/errors/domain_errors'
import {
  MissingParameters,
  WrongTypeParameters,
} from '@/shared/helpers/errors/controller_errors'
import { NoItemsFound } from '@/shared/helpers/errors/usecase_errors'

export class GetAllWithdrawsController {
  constructor(private usecase: GetAllWithdrawsUsecase) {}

  async handle(request: IRequest) {
    try {
      const withdraws = await this.usecase.execute()
      const viewModel = new GetAllWithdrawViewmodel(withdraws)
      return new OK(viewModel.toJSON())
    } catch (error) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (
        error instanceof MissingParameters ||
        error instanceof WrongTypeParameters ||
        error instanceof EntityError
      ) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
