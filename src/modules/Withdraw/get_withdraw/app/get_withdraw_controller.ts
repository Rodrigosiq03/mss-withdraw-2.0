/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetWithdrawUseCase } from './get_withdraw_usecase'
import { WithdrawViewModel } from './get_withdraw_viewmodel'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  OK,
  Unauthorized,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { IRequest } from '../../../../shared/helpers/external_interfaces/external_interface'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../../shared/helpers/errors/controller_errors'
import {
  NoItemsFound,
  ForbiddenAction,
} from '../../../../shared/helpers/errors/usecase_errors'

export class GetWithdrawByNotebookSerialNumberController {
  constructor(private usecase: GetWithdrawUseCase) {}

  async handle(request: IRequest, user: any) {
    try {
      if (!user || (user.role !== 'EMPLOYEE' && user.role !== 'ADMIN')) {
        throw new ForbiddenAction('type of user')
      }

      if (request.data.notebookSerialNumber === undefined) {
        throw new MissingParameters('notebookSerialNumber')
      }
      if (typeof request.data.notebookSerialNumber !== 'string') {
        throw new WrongTypeParameters(
          'notebookSerialNumber',
          'string',
          typeof request.data.notebookSerialNumber,
        )
      }

      const notebookSerialNumber = request.data.notebookSerialNumber
      const withdraw = await this.usecase.execute(notebookSerialNumber)
      const viewModel = new WithdrawViewModel(withdraw)

      return new OK(viewModel.toJSON())
    } catch (error: any) {
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
      if (error instanceof ForbiddenAction) {
        return new Unauthorized(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
