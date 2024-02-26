import { Withdraw } from '@/shared/domain/entities/withdraw'
import { IWithdrawRepository } from '@/shared/domain/repositories/withdraw_repository_interface'

export class WithdrawRepositoryDynamo implements IWithdrawRepository {
  createWithdraw(notebookSerialNumber: string, studentRA: string, name: string, initTime: number): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  getWithdrawByNotebookSerialNumber(notebookSerialNumber: string): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error('Method not implemented.')
  }
  updateWithdrawByNotebookSerialNumber(notebookSerialNumber: string, isChecked: boolean): Promise<Withdraw> {
    throw new Error('Method not implemented.')
  }
  
}