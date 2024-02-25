import { IWithdrawRepository } from '@/shared/domain/repositories/withdraw_repository_interface'
import { EntityError } from '../../../../shared/helpers/errors/domain_errors'

export class UpdateWithdraw {
  constructor(private repo: IWithdrawRepository) {}

  async execute(ra: string, isChecked: boolean) {
    if (typeof ra !== 'string' || ra === '') {
      throw new EntityError('ra')
    }

    if (typeof isChecked !== 'boolean') {
      throw new EntityError('isChecked')
    }

    const withdraw = await this.repo.updateWithdrawByRA(ra, isChecked)

    return withdraw
  }
}
