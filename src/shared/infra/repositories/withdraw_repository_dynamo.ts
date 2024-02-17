import { Withdraw } from '@/shared/domain/entities/withdraw'
import { IWithdrawRepository } from '@/shared/domain/repositories/withdraw_repository_interface'

export class WithdrawRepositoryDynamo implements IWithdrawRepository {
  createWithdraw(withdraw: Withdraw): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  getWithdrawByRA(ra: string): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.')
  }
  deleteWithdrawByRA(ra: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}