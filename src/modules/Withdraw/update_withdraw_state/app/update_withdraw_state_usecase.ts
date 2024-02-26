import { IWithdrawRepository } from '../../../../shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import { Withdraw } from '../../../../shared/domain/entities/withdraw'

export class UpdateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string, isChecked: boolean) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (typeof isChecked !== 'boolean' || isChecked === undefined) {
      throw new EntityError('isChecked')
    }

    const withdraw = await this.repo.updateWithdrawByNotebookSerialNumber(notebookSerialNumber, isChecked)

    return withdraw
  }
}
