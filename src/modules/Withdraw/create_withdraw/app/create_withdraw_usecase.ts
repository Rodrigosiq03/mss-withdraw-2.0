import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'
import { IWithdrawRepository } from '../../../../../src/shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../../src/shared/helpers/errors/domain_errors'

export class CreateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    if (!Withdraw.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    if (!Withdraw.validateTime(initTime)) {
      throw new EntityError('initTime')
    }

    const withdraw = new Withdraw({
      notebookSerialNumber,
      studentRA,
      name,
      initTime,
      state: STATE.PENDING,
    })
    return this.repo.createWithdraw(withdraw)
  }
}
