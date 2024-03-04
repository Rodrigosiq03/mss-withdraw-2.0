import { WithdrawProps } from '../../../shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

export class WithdrawViewModel {
  private notebookSerialNumber: string
  private studentRA?: string
  private name?: string
  private initTime?: number
  private finishTime?: number
  private state: STATE

  constructor(withdraw: WithdrawProps) {
    this.notebookSerialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA
    this.name = withdraw.name
    this.initTime = withdraw.initTime
    this.finishTime = withdraw.finishTime
    this.state = withdraw.state
  }

  toJSON() {
    return {
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      name: this.name,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
    }
  }
}

export class GetAllWithdrawsViewModel {
  private withdraws: WithdrawViewModel[]

  constructor(withdraws: WithdrawProps[]) {
    this.withdraws = withdraws.map(
      (withdraw) => new WithdrawViewModel(withdraw),
    )
  }

  toJSON() {
    return {
      withdraws: this.withdraws.map((withdraw) => withdraw.toJSON()),
      message: 'All withdraws have been retrieved successfully',
    }
  }
}
