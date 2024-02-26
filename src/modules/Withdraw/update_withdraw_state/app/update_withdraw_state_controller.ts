/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { UpdateWithdrawUsecase } from './update_withdraw_state_usecase'
import { UpdateWithdrawViewModel } from './update_withdraw_state_viewmodel'
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import {
  ForbiddenAction,
  NoItemsFound,
} from '../../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  InternalServerError,
  NotFound,
  OK,
  Unauthorized,
} from '../../../../shared/helpers/external_interfaces/http_codes'

export class UpdateWithdrawController {
  constructor(private usecase: UpdateWithdrawUsecase) {}

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
      if (request.data.state === undefined) {
        throw new MissingParameters('state')
      }
      if (typeof request.data.state !== 'boolean') {
        throw new WrongTypeParameters(
          'state',
          'boolean',
          typeof request.data.state,
        )
      }

      const notebookSerialNumber = request.data.notebookSerialNumber
      const state = request.data.state
      await this.usecase.execute(notebookSerialNumber, state)

      const viewModel = new UpdateWithdrawViewModel()
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
      return new InternalServerError(error.message)
    }
  }
}
