import { EntityError } from '../../../../../src/shared/helpers/errors/domain_errors'
import { IWithdrawRepository } from '../../../../../src/shared/domain/repositories/withdraw_repository_interface'
import { Withdraw } from '../../../../shared/domain/entities/withdraw'

export class GetWithdrawUseCase {
  constructor(private readonly withdrawRepository: IWithdrawRepository) {}

  async execute(ra: string): Promise<Withdraw> {
    if (!Withdraw.validateStudentRA(ra)) {
      throw new EntityError('ra')
    }

    const withdraw = await this.withdrawRepository.getWithdrawByRA(ra)
    return withdraw
  }
}
