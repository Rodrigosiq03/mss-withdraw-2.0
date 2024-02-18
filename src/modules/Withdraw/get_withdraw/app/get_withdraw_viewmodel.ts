import { Withdraw } from '../../../../shared/domain/entities/withdraw'
import { STATE } from '../../../../shared/domain/enums/state_enum'

export class WithdrawViewModel {
  private id: string
  private notebookSerialNumber: string
  private studentRA: string
  private initTime: number
  private finishTime?: number
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.id = withdraw.withdrawId
    this.notebookSerialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA
    this.initTime = withdraw.initTime
    this.finishTime = withdraw.finishTime
    this.state = withdraw.state as STATE
  }

  toJSON() {
    return {
      id: this.id,
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
    }
  }
}
