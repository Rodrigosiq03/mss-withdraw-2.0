import { Withdraw } from '../../../../shared/domain/entities/withdraw'
import { STATE } from '@/shared/domain/enums/state_enum'

export class WithdrawViewmodel {
  private id: string
  private serialNumber: string
  private studentRA: string
  private initTime: number
  private finishTime?: number
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.id = withdraw.withdrawId
    this.serialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA
    this.initTime = withdraw.initTime
    this.finishTime = withdraw.finishTime
    this.state = withdraw.state as STATE
  }

  toJSON() {
    return {
      id: this.id,
      serialNumber: this.serialNumber,
      studentRA: this.studentRA,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
    }
  }
}

export class GetAllWithdrawViewmodel {
  private withdraws: WithdrawViewmodel[]

  constructor(withdraws: Withdraw[]) {
    this.withdraws = withdraws.map(
      (withdraw) => new WithdrawViewmodel(withdraw),
    )
  }

  toJSON() {
    return {
      withdraws: this.withdraws.map((withdraw) => withdraw.toJSON()),
      message: 'All withdraws have been retrieved successfully',
    }
  }
}
