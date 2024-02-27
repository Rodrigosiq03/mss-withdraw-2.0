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

  private pendingWithdraws: Withdraw[] = [
    new Withdraw({
      notebookSerialNumber: 'MNO345',
      state: STATE.PENDING,
    }),
    new Withdraw({
      notebookSerialNumber: 'MNO678',
      state: STATE.PENDING,
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

  async createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ): Promise<Withdraw> {
    const existingWithdraw = this.inactiveWithdraws.find(
      (w) => w.notebookSerialNumber === notebookSerialNumber,
    )

    if (existingWithdraw) {
      existingWithdraw.setState(STATE.PENDING)
      return existingWithdraw
    } else {
      const withdraw = new Withdraw({
        notebookSerialNumber,
        studentRA,
        name,
        initTime,
        state: STATE.PENDING,
      })
      this.activeWithdraws.push(withdraw)
      return withdraw
    }
  }

  async getWithdrawByNotebookSerialNumber(
    notebookSerialNumber: string,
  ): Promise<Withdraw> {
    let withdraw = this.activeWithdraws.find(
      (w) => w.notebookSerialNumber === notebookSerialNumber,
    )
    if (!withdraw) {
      withdraw = this.inactiveWithdraws.find(
        (w) => w.notebookSerialNumber === notebookSerialNumber,
      )
    }
    if (!withdraw) {
      throw new NoItemsFound('notebookSerialNumber')
    }
    return withdraw
  }

  async getAllWithdraws(): Promise<Withdraw[]> {
    return [...this.inactiveWithdraws, ...this.activeWithdraws]
  }

  async updateWithdrawByNotebookSerialNumber(notebookSerialNumber: string, isChecked: boolean): Promise<Withdraw> {
    const index = this.pendingWithdraws.findIndex((w) => w.notebookSerialNumber === notebookSerialNumber)
    if (index === -1) {
      throw new NoItemsFound('props.notebookSerialNumber')
    }

    if (this.pendingWithdraws[index].state !== STATE.PENDING) {
      throw new NoItemsFound('props.notebookSerialNumber')
    }

    if (isChecked) {
      this.activeWithdraws[index].setState(STATE.APPROVED)
    } else {
      this.activeWithdraws[index].setState(STATE.INACTIVE)
    }

    return this.activeWithdraws[index]
  }

  async finishWithdrawByNotebookSerialNumber(notebookSerialNumber: string): Promise<Withdraw> {
    const index = this.activeWithdraws.findIndex((w) => w.notebookSerialNumber === notebookSerialNumber)
    if (index === -1) {
      throw new NoItemsFound('props.notebookSerialNumber')
    }

    this.activeWithdraws[index].setState(STATE.INACTIVE)
    this.activeWithdraws[index].setFinishTime(undefined)
    this.activeWithdraws[index].setStudentRA(undefined)
    this.activeWithdraws[index].setName(undefined)

    return this.activeWithdraws[index]
  }
}
