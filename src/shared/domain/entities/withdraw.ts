import { EntityError } from '../../helpers/errors/domain_errors'
import { STATE } from '../enums/state_enum'

export interface WithdrawProps {
  withdrawId: string
  notebookSerialNumber: string
  studentRA: string
  initTime: number
  finishTime?: number
  state: STATE
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

    if (!Withdraw.validateTime(props.initTime)) {
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

  set setWithdrawId(withdrawId: string) {
    if (!Withdraw.validateWithdrawId(withdrawId)) {
      throw new EntityError('withdrawId')
    }
    this.props.withdrawId = withdrawId
  }

  get notebookSerialNumber() {
    return this.props.notebookSerialNumber
  }

  set setNotebookSerialNumber(notebookSerialNumber: string) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    this.props.notebookSerialNumber = notebookSerialNumber
  }

  get studentRA() {
    return this.props.studentRA
  }

  set setStudentRA(studentRA: string) {
    if (!Withdraw.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    this.props.studentRA = studentRA
  }

  get initTime() {
    return this.props.initTime
  }

  set setInitTime(initTime: number) {
    if (!Withdraw.validateTime(initTime)) {
      throw new EntityError('withdrawalTime')
    }
    this.props.initTime = initTime
  }

  get finishTime() {
    return this.props.finishTime
  }

  set setFinishTime(finishTime: number) {
    if (finishTime !== undefined && !Withdraw.validateTime(finishTime)) {
      throw new EntityError('finishTime')
    }
    this.props.finishTime = finishTime
  }

  get state() {
    return this.props.state
  }

  set state(state: STATE) {
    if (!Withdraw.validateState(state)) {
      throw new EntityError('state')
    }
    this.props.state = state
  }

  static validateWithdrawId(withdrawId: string): boolean {
    return (
      withdrawId !== undefined &&
      withdrawId !== null &&
      typeof withdrawId === 'string' &&
      withdrawId.trim().length > 0
    )
  }

  static validateNotebookSerialNumber(notebookSerialNumber: string): boolean {
    return (
      notebookSerialNumber !== undefined &&
      notebookSerialNumber !== null &&
      typeof notebookSerialNumber === 'string' &&
      notebookSerialNumber.length > 0 &&
      notebookSerialNumber.length !== 0 &&
      notebookSerialNumber.length <= 50
    )
  }

  static validateStudentRA(studentRA: string): boolean {
    const raPattern = /^\d{2}\.\d{5}-[0-9]$/

    return raPattern.test(studentRA)
  }

  static validateTime(time: number): boolean {
    if (time === null || time === undefined) {
      return false
    }

    if (typeof time !== 'number' || isNaN(time)) {
      return false
    }

    if (time < 1641006000000) {
      return false
    }
    return true
  }

  static validateState(state: STATE): boolean {
    return Object.values(STATE).includes(state)
  }
}
