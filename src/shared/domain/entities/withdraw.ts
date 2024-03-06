import { EntityError } from '../../helpers/errors/domain_errors'
import { STATE } from '../enums/state_enum'

export interface WithdrawProps {
  notebookSerialNumber: string
  studentRA?: string | null 
  name?: string | null
  initTime?: number | null
  finishTime?: number | null
  state: STATE
}

export class Withdraw {
  constructor(public props: WithdrawProps) {
    this.validateProps(props)
  }

  private validateProps(props: WithdrawProps) {
    if (!Withdraw.validateNotebookSerialNumber(props.notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (props.initTime !== undefined && props.initTime !== null && !Withdraw.validateTime(props.initTime)) {
      throw new EntityError('initTime')
    }

    if (
      props.finishTime !== undefined &&
      props.finishTime !== null &&
      !Withdraw.validateTime(props.finishTime)
    ) {
      throw new EntityError('finishTime')
    }

    if (
      props.finishTime !== undefined &&
      props.finishTime !== null &&
      props.initTime !== null &&
      props.initTime !== undefined &&
      props.finishTime < props.initTime
    ) {
      throw new EntityError(
        'initTime and finishTime must be in the correct order',
      )
    }
  }

  get notebookSerialNumber() {
    return this.props.notebookSerialNumber
  }

  setnotebookSerialNumber(notebookSerialNumber: string) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    this.props.notebookSerialNumber = notebookSerialNumber
  }

  get studentRA() {
    return this.props.studentRA
  }

  setStudentRA(studentRA?: string | null) {
    if (studentRA !== undefined && studentRA !== null && !Withdraw.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    this.props.studentRA = studentRA
  }

  get name() {
    return this.props.name
  }

  setName(name?: string | null) {
    this.props.name = name
  }

  get initTime() {
    return this.props.initTime
  }

  setInitTime(initTime?: number | null) {
    if (initTime !== undefined && initTime !== null && !Withdraw.validateTime(initTime)) {
      throw new EntityError('initTime')
    }
    this.props.initTime = initTime
  }

  get finishTime() {
    return this.props.finishTime
  }

  setFinishTime(finishTime?: number | null) {
    if (finishTime !== undefined && finishTime !== null && !Withdraw.validateTime(finishTime)) {
      throw new EntityError('finishTime')
    }
    this.props.finishTime = finishTime
  }

  get state() {
    return this.props.state ?? STATE.PENDING
  }

  setState(state: STATE) {
    if (!Withdraw.validateState(state)) {
      throw new EntityError('state')
    }
    this.props.state = state
  }

  static validateNotebookSerialNumber(notebookSerialNumber?: string | null): boolean {
    return (
      typeof notebookSerialNumber === 'string' &&
      notebookSerialNumber.length > 0 &&
      notebookSerialNumber.length !== 0 &&
      notebookSerialNumber.length <= 50
    )
  }

  static validateStudentRA(studentRA?: string | null): boolean {
    if (studentRA === undefined || studentRA === null) {
      return true
    }
    const raPattern = /^\d{2}\.\d{5}-[0-9]$/
    return raPattern.test(studentRA)
  }

  static validateTime(time?: number | null): boolean {
    if (
      typeof time !== 'number' ||
      isNaN(time)
    ) {
      return false
    }

    const minValidTime = new Date('1970-01-01').getTime()
    const maxValidTime = new Date('2100-01-01').getTime()

    return time >= minValidTime && time <= maxValidTime
  }

  static validateState(state: STATE): boolean {
    return Object.values(STATE).includes(state)
  }
}
