import { Withdraw } from '../../../shared/domain/entities/withdraw'
import { STATE } from '../../../shared/domain/enums/state_enum'

export class GetWithdrawViewModel {
  private notebookSerialNumber: string
  private studentRA?: string
  private name?: string
  private initTime?: number
  private state: STATE

  constructor(withdraw: Withdraw) {
    this.notebookSerialNumber = withdraw.props.notebookSerialNumber
    this.studentRA = withdraw.props.studentRA
    this.name = withdraw.props.name
    this.initTime = withdraw.props.initTime
    this.state = withdraw.props.state
  }

  toJSON() {
    return {
      notebookSerialNumber: this.notebookSerialNumber,
      studentRA: this.studentRA,
      name: this.name,
      initTime: this.initTime,
      state: this.state,
      message: 'Withdraw has been retrieved successfully',
    }
  }
}
