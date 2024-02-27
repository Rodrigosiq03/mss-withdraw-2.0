/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FinishWithdrawUsecase } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_usecase'
import { FinishWithdrawViewModel } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_viewmodel'
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

export class FinishWithdrawController {
  constructor(private usecase: FinishWithdrawUsecase) {}

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
      await this.usecase.execute(notebookSerialNumber)

      const viewModel = new FinishWithdrawViewModel()
      return new OK(viewModel.toJSON())
    } catch (error: any) {
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof ForbiddenAction) {
        return new Unauthorized(error.message)
      }
      if (error instanceof NoItemsFound) {
        return new NotFound(error.message)
      }
      return new InternalServerError(error.message)
    }
  }
}
