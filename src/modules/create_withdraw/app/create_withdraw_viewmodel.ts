import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

export class CreateViewmodel {
  private notebookSerialNumber: string
  private studentRA?: string | null
  private initTime?: number | null
  private finishTime?: number | null
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.notebookSerialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA
    this.initTime = withdraw.initTime
    this.finishTime = withdraw.finishTime
    this.state = withdraw.state
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