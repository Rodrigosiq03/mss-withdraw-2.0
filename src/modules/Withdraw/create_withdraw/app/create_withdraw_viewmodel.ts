import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'

export class CreateViewmodel {
  private withdrawId: string
  private notebookSerialNumber: string
  private studentRA: string
  private initTime: number
  private finishTime?: number
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.withdrawId = withdraw.withdrawId
    this.notebookSerialNumber = withdraw.notebookSerialNumber
    this.studentRA = withdraw.studentRA
    this.initTime = withdraw.initTime
    this.finishTime = withdraw.finishTime
    this.state = withdraw.state as STATE
  }

  toJSON() {
    return {
      withdrawId: this.withdrawId,
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
      message: 'The withdraw was created successfully', //ver essa mensagem aqui porra
    }
  }
}
