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
    const existingWithdraw = this.inactiveWithdraws.find(
      (w) => w.notebookSerialNumber === withdraw.notebookSerialNumber,
    )

    if (existingWithdraw) {
      existingWithdraw.setState(STATE.PENDING)
      return existingWithdraw
    } else {
      this.activeWithdraws.push(withdraw)
      return withdraw
    }
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

  async updateWithdrawByRA(
    ra: string,
    isChecked: boolean,
  ): Promise<Withdraw> {
    const index = this.activeWithdraws.findIndex((w) => w.studentRA === ra)
    if (index === -1) {
      throw new NoItemsFound('props.studentRA')
    }

    if (isChecked) {
      this.activeWithdraws[index].setState(STATE.APPROVED)
    } else {
      this.activeWithdraws[index].setState(STATE.INACTIVE)
    }

    return this.activeWithdraws[index]
  }
}
