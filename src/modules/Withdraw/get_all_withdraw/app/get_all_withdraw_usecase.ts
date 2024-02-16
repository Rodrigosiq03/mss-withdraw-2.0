import { IWithdrawRepository } from '../../../../shared/domain/repositories/withdraw_repository_interface'
import { Withdraw } from '../../../../shared/domain/entities/withdraw'

export class GetAllWithdrawsUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(): Promise<Withdraw[]> {
    return this.repo.getAllWithdraws()
  }
}
