import { Withdraw } from '../entities/withdraw'

export interface IWithdrawRepository {
  createWithdraw(withdraw: Withdraw): Promise<Withdraw>
  getWithdrawByRA(ra: string): Promise<Withdraw>
  getAllWithdraws(): Promise<Withdraw[]>
  deleteWithdrawByRA(ra: string): Promise<boolean>
}
