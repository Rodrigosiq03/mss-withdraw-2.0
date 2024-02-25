import { WithdrawProps } from '../../../../shared/domain/entities/withdraw'
import { STATE } from '../../../../shared/domain/enums/state_enum'

export class UpdateWithdrawViewModel {
  private notebookSerialNumber: string
  private studentRA?: string
  private name?: string
  private initTime?: number
  private finishTime?: number
  private state: STATE

  constructor(props: WithdrawProps) {
    this.notebookSerialNumber = props.notebookSerialNumber
    this.studentRA = props.studentRA
    this.name = props.name
    this.initTime = props.initTime
    this.finishTime = props.finishTime
    this.state = props.state
  }

  toJSON() {
    return {
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      name: this.name,
      initTime: this.initTime,
      finishTime: this.finishTime,
      state: this.state,
      message: 'The withdraw was updated successfully',
    }
  }
}
