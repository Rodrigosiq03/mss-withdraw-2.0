import { IWithdrawRepository } from '../../../../shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'
import { Withdraw } from '../../../../shared/domain/entities/withdraw'

export class UpdateWithdraw {
  constructor(private repo: IWithdrawRepository) {}

  async execute(ra: string, isChecked: boolean) {
    if (!Withdraw.validateStudentRA(ra)) {
      throw new EntityError('ra')
    }

    if (typeof isChecked !== 'boolean' || isChecked === undefined) {
      throw new EntityError('isChecked')
    }

    const withdraw = await this.repo.updateWithdrawByRA(ra, isChecked)

    return withdraw
  }
}
