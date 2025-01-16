/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import {
  BadRequest,
  Created,
  InternalServerError,
  NotFound,
  Unauthorized,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { CreateNotebookUsecase } from './create_notebook_usecase'
import { CreateNotebookViewmodel } from './create_notebook_viewmodel'
import { ForbiddenAction, NoItemsFound } from '../../../shared/helpers/errors/usecase_errors'
  
export class CreateNotebookController {
  constructor(private usecase: CreateNotebookUsecase) {}
  
  async handle(request: IRequest, user: any) {
    console.log('ENTROU NO CONTROLLER')
    try {
      if (user === undefined) {
        throw new MissingParameters('user')
      }
  
      const role = user.role

      const notebookSerialNumber = request.data.notebookSerialNumber as string
        
      if (role === undefined || role !== 'STUDENT') {
        throw new ForbiddenAction('type of user')
      }
        
      if (!request.data.notebookSerialNumber) {
        throw new MissingParameters('notebookSerialNumber')
      }

      console.log('DEU MERDA ANTES DE CHAMAR O USECASE')
      const notebook = await this.usecase.execute(
        notebookSerialNumber
      )
      console.log('DEU MERDA AO CHAMAR O USECASE')
  
      const viewmodel = new CreateNotebookViewmodel(notebook)
  
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
      if (error instanceof ForbiddenAction) {
        return new Unauthorized(error.message)
      }
      return new InternalServerError(error.message)
    }
  }
}