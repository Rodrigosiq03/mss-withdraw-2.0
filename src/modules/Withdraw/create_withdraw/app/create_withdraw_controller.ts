/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import { ForbiddenAction, NoItemsFound } from '../../../../shared/helpers/errors/usecase_errors'
import { IRequest } from '../../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  Created,
  InternalServerError,
  NotFound,
  Unauthorized,
} from '../../../../shared/helpers/external_interfaces/http_codes'
import { CreateWithdrawUsecase } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_usecase'
import { CreateViewmodel } from './create_withdraw_viewmodel'

export class CreateWithdrawController {
  constructor(private usecase: CreateWithdrawUsecase) {}

  async handle(request: IRequest, decoded: any) {
    try {
      if (decoded === undefined) {
        throw new MissingParameters('token')
      }
      if (decoded.role === undefined || decoded.role !== 'STUDENT') {
        throw new ForbiddenAction('type of user')
      }
      if (request.data.withdrawId === undefined) {
        throw new MissingParameters('withdrawId')
      }
      if (request.data.notebookSerialNumber === undefined) {
        throw new MissingParameters('notebookSerialNumber')
      }
      if (request.data.studentRA === undefined) {
        throw new MissingParameters('studentRA')
      }
      if (request.data.initTime === undefined) {
        throw new MissingParameters('initTime')
      }
      if (typeof request.data.withdrawId !== 'string') {
        throw new WrongTypeParameters(
          'withdrawId',
          'string',
          typeof request.data.withdrawId,
        )
      }
      if (typeof request.data.notebookSerialNumber !== 'string') {
        throw new WrongTypeParameters(
          'notebookSerialNumber',
          'string',
          typeof request.data.notebookSerialNumber,
        )
      }
      if (typeof request.data.studentRA !== 'string') {
        throw new WrongTypeParameters(
          'studentRA',
          'string',
          typeof request.data.studentRA,
        )
      }
      if (typeof request.data.initTime !== 'number') {
        throw new WrongTypeParameters(
          'initTime',
          'number',
          typeof request.data.initTime,
        )
      }

      const withdraw = await this.usecase.execute(
        request.data.withdrawId,
        request.data.notebookSerialNumber,
        request.data.studentRA,
        request.data.initTime,
      )

      const viewmodel = new CreateViewmodel(withdraw)

      const response = new Created(viewmodel.toJSON())

      return response
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
      if (error instanceof ForbiddenAction) {
        return new Unauthorized(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
