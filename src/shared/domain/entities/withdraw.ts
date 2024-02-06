import { EntityError } from '../../helpers/errors/domain_errors'

export interface WithdrawProps {
  withdrawId: number
  notebookSerialNumber: string
  studentRA: string
  withdrawalTime: number
  finishTime?: number
}

export class Withdraw {
  constructor(public props: WithdrawProps) {
    if (!Withdraw.validateWithdrawId(props.withdrawId)) {
      throw new EntityError('withdrawId')
    }

    if (!Withdraw.validateNotebookSerialNumber(props.notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (!Withdraw.validateStudentRA(props.studentRA)) {
      throw new EntityError('studentRA')
    }

    if (!Withdraw.validateTime(props.withdrawalTime)) {
      throw new EntityError('withdrawalTime')
    }

    if (
      props.finishTime !== undefined &&
      !Withdraw.validateTime(props.finishTime)
    ) {
      throw new EntityError('finishTime')
    }
  }

  get withdrawId() {
    return this.props.withdrawId
  }

  get notebookSerialNumber() {
    return this.props.notebookSerialNumber
  }

  get studentRA() {
    return this.props.studentRA
  }

  get withdrawalTime() {
    return this.props.withdrawalTime
  }

  get finishTime() {
    return this.props.finishTime
  }

  
}
