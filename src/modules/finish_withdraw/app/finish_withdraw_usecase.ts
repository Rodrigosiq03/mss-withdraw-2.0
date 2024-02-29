import { IWithdrawRepository } from '../../../shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Withdraw } from '../../../shared/domain/entities/withdraw'

export class FinishWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string, ) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    const withdraw = await this.repo.finishWithdrawByNotebookSerialNumber(notebookSerialNumber)

    return withdraw
  }
}