import { Withdraw } from '@/shared/domain/entities/withdraw'
import { STATE } from '../../../../.././src/shared/domain/enums/state_enum'
import { IWithdrawRepository } from '../../../../.././src/shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../.././src/shared/helpers/errors/domain_errors'

export class CreateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(
    withdrawId: string,
    notebookSerialNumber: string,
    studentRA: string,
    initTime: number,
  ) {
    if (Withdraw.validateWithdrawId(withdrawId) === false) {
      throw new EntityError('withdrawId')
    }
    if (Withdraw.validateNotebookSerialNumber(notebookSerialNumber) === false) {
      throw new EntityError('notebookSerialNumber')
    }
    if (Withdraw.validateStudentRA(studentRA) === false) {
      throw new EntityError('studentRA')
    }
    if (Withdraw.validateTime(initTime) === false) {
      throw new EntityError('initTime')
    }

    const withdraw = new Withdraw({
      withdrawId,
      notebookSerialNumber,
      studentRA,
      initTime,
      state: STATE.PENDING,
    })
    return this.repo.createWithdraw(withdraw)
  }
}
