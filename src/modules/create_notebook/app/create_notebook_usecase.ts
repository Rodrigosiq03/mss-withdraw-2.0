import { IWithdrawRepository } from '../../../shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { Withdraw } from '../../../shared/domain/entities/withdraw'

export class CreateNotebookUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(
    notebookSerialNumber: string,
  ) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    const NotebookUpdated = await this.repo.createNotebook(
      notebookSerialNumber,
    )

    return NotebookUpdated
  }
}