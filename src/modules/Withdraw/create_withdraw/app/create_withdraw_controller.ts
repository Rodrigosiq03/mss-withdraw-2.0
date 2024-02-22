/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt from 'jsonwebtoken'
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import { IRequest } from '../../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  Created,
  InternalServerError,
  NotFound,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'
import { CreateViewmodel } from './create_withdraw_viewmodel'
import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import { NoItemsFound } from '../../../../shared/helpers/errors/usecase_errors'

export class CreateWithdrawController {
  constructor(private usecase: CreateWithdrawUsecase) {}

  async handle(request: IRequest) {
    try {
      const token = request.headers.authorization.split(' ')[1]

      const decoded = jwt.decode(token) as any
      if (!decoded) {
        throw new Error('Invalid token')
      }

      const user = JSON.parse(decoded.user)

      const { notebookSerialNumber } = request.data as {
        notebookSerialNumber: string
      }

      if (!notebookSerialNumber) {
        throw new MissingParameters('notebookSerialNumber')
      }
      if (!user.name) {
        throw new MissingParameters('name')
      }
      if (!user.studentRA) {
        throw new MissingParameters('studentRA')
      }

      if (!Withdraw.validateStudentRA(user.studentRA)) {
        throw new EntityError('studentRA')
      }

      const initTime = new Date().getTime()

      const withdraw = await this.usecase.execute(
        notebookSerialNumber,
        user.studentRA,
        user.name,
        initTime,
      )

      const viewmodel = new CreateViewmodel(withdraw)

      const response = new Created(viewmodel.toJSON())

      return response
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
      return new InternalServerError(error.message)
    }
  }
}
