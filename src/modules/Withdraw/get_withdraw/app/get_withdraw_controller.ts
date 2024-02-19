/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetWithdrawUseCase } from './get_withdraw_usecase'
import { WithdrawViewModel } from './get_withdraw_viewmodel'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  OK,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { IRequest } from '../../../../shared/helpers/external_interfaces/external_interface'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../../shared/helpers/errors/controller_errors'
import { NoItemsFound } from '../../../../../src/shared/helpers/errors/usecase_errors'

export class GetWithdrawByRAController {
  constructor(private usecase: GetWithdrawUseCase) {}

  async handle(request: IRequest) {
    try {
      if (request.data.studentRA === undefined) {
        throw new MissingParameters('studentRA')
      }
      if (typeof request.data.studentRA !== 'string') {
        throw new WrongTypeParameters(
          'studentRA',
          'string',
          typeof request.data.studentRA,
        )
      }

      const studentRA = request.data.studentRA
      const withdraw = await this.usecase.execute(String(studentRA))
      const viewModel = new WithdrawViewModel(withdraw)

      return new OK(viewModel.toJSON())
    } catch (error: any) {
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
