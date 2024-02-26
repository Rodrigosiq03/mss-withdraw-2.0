import { Withdraw } from '../entities/withdraw'

export interface IWithdrawRepository {
  createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ): Promise<Withdraw>
  getWithdrawByNotebookSerialNumber(notebookSerialNumber: string): Promise<Withdraw>
  getAllWithdraws(): Promise<Withdraw[]>
  updateWithdrawByNotebookSerialNumber(notebookSerialNumber: string, isChecked: boolean): Promise<Withdraw>
}
