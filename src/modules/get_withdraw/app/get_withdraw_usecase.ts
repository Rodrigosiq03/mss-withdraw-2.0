import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { IWithdrawRepository } from '../../../shared/domain/repositories/withdraw_repository_interface'
import { Withdraw } from '../../../shared/domain/entities/withdraw'

export class GetWithdrawUseCase {
  constructor(private readonly withdrawRepository: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string): Promise<Withdraw> {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    const withdraw = await this.withdrawRepository.getWithdrawByNotebookSerialNumber(notebookSerialNumber)
    return withdraw
  }
}
