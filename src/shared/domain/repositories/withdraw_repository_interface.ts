import { Withdraw } from '../entities/withdraw'

export interface IWithdrawRepository {
  createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ): Promise<Withdraw>
  getWithdrawByRA(ra: string): Promise<Withdraw>
  getAllWithdraws(): Promise<Withdraw[]>
  updateWithdrawByRA(ra: string, isChecked: boolean): Promise<Withdraw>
}
