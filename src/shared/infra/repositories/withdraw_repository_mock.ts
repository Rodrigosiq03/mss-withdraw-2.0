import { STATE } from '../../domain/enums/state_enum'
import { Withdraw } from '../../domain/entities/withdraw'
import { IWithdrawRepository } from '../../domain/repositories/withdraw_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class WithdrawRepositoryMock implements IWithdrawRepository {
  private withdraws: Withdraw[] = [
    new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: Date.now(),
      state: STATE.PENDING,
    }),
    new Withdraw({
      withdrawId: '2',
      notebookSerialNumber: 'DEF456',
      studentRA: '23.00444-8',
      initTime: Date.now(),
      state: STATE.PENDING,
    }),
  ]

  async createWithdraw(withdraw: Withdraw): Promise<Withdraw> {
    this.withdraws.push(withdraw)
    return withdraw
  }

  async getWithdrawByRA(ra: string): Promise<Withdraw> {
    const withdraw = this.withdraws.find((w) => w.studentRA === ra)
    if (!withdraw) {
      throw new NoItemsFound('props.studentRA')
    }
    return withdraw
  }

  async getAllWithdraws(): Promise<Withdraw[]> {
    return this.withdraws
  }

  async deleteWithdrawByRA(ra: string): Promise<boolean> {
    const index = this.withdraws.findIndex((w) => w.studentRA === ra)
    if (index === -1) {
      throw new NoItemsFound('props.studentRA')
    }
    this.withdraws.splice(index, 1)
    return true
  }
}
