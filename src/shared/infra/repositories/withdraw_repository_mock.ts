import { STATE } from '../../domain/enums/state_enum'
import { Withdraw } from '../../domain/entities/withdraw'
import { IWithdrawRepository } from '../../domain/repositories/withdraw_repository_interface'
import { NoItemsFound } from '../../helpers/errors/usecase_errors'

export class WithdrawRepositoryMock implements IWithdrawRepository {
  private inactiveWithdraws: Withdraw[] = [
    new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.INACTIVE,
    }),
    new Withdraw({
      notebookSerialNumber: 'DEF456',
      state: STATE.INACTIVE,
    }),
  ]

  private activeWithdraws: Withdraw[] = [
    new Withdraw({
      notebookSerialNumber: 'GHI789',
      studentRA: '23.00555-7',
      name: 'Matue',
      initTime: 1704074148000,
      state: STATE.PENDING,
    }),
    new Withdraw({
      notebookSerialNumber: 'JKL012',
      studentRA: '23.00656-6',
      name: 'Thiago Veigh',
      initTime: 1704074148000,
      state: STATE.PENDING,
    }),
  ]

  async createWithdraw(withdraw: Withdraw): Promise<Withdraw> {
    if (withdraw.state === STATE.INACTIVE) {
      this.inactiveWithdraws.push(withdraw)
    } else {
      this.activeWithdraws.push(withdraw)
    }
    return withdraw
  }

  async getWithdrawByRA(ra: string): Promise<Withdraw> {
    const withdraw = this.activeWithdraws.find((w) => w.studentRA === ra)
    if (!withdraw) {
      throw new NoItemsFound('studentRA')
    }
    return withdraw
  }

  async getAllWithdraws(): Promise<Withdraw[]> {
    return [...this.inactiveWithdraws, ...this.activeWithdraws]
  }

  async deleteWithdrawByRA(ra: string): Promise<boolean> {
    const index = this.activeWithdraws.findIndex((w) => w.studentRA === ra)
    if (index === -1) {
      throw new NoItemsFound('props.studentRA')
    }
    this.activeWithdraws.splice(index, 1)
    return true
  }

  async updateWithdrawByRA(
    ra: string,
    updatedWithdraw: Withdraw,
  ): Promise<Withdraw> {
    const index = this.activeWithdraws.findIndex((w) => w.studentRA === ra)
    if (index === -1) {
      throw new NoItemsFound('props.studentRA')
    }
    this.activeWithdraws[index] = updatedWithdraw
    return updatedWithdraw
  }
}
