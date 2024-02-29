import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

export class CreateViewmodel {
  private notebookSerialNumber: string
  private studentRA: string
  private initTime: number
  private finishTime?: number
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.notebookSerialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA ?? ''
    this.initTime = withdraw.initTime ?? 0
    this.finishTime = withdraw.finishTime ?? 0
    this.state = (withdraw.state as STATE) ?? STATE.INACTIVE
  }

  toJSON() {
    return {
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
      message: 'The withdraw was created successfully',
    }
  }
}