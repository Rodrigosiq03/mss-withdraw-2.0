import { EntityError } from '../../helpers/errors/domain_errors'
import { STATE } from '../enums/state_enum'

export interface WithdrawProps {
  notebookSerialNumber: string
  studentRA?: string
  name?: string
  initTime?: number
  finishTime?: number
  state: STATE
}

export class Withdraw {
  constructor(public props: WithdrawProps) {
    this.validateProps(props)
  }

  private validateProps(props: WithdrawProps) {
    if (!this.validateNotebookSerialNumber(props.notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (props.initTime !== undefined && !this.validateTime(props.initTime)) {
      throw new EntityError('initTime')
    }

    if (
      props.finishTime !== undefined &&
      !this.validateTime(props.finishTime)
    ) {
      throw new EntityError('finishTime')
    }

    if (
      props.finishTime !== undefined &&
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
    if (!this.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    this.props.notebookSerialNumber = notebookSerialNumber
  }

  get studentRA() {
    return this.props.studentRA
  }

  setStudentRA(studentRA: string) {
    if (!this.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    this.props.studentRA = studentRA
  }

  get name() {
    return this.props.name
  }

  setName(name: string) {
    this.props.name = name
  }

  get initTime() {
    return this.props.initTime
  }

  setInitTime(initTime: number) {
    if (!this.validateTime(initTime)) {
      throw new EntityError('initTime')
    }
    this.props.initTime = initTime
  }

  get finishTime() {
    return this.props.finishTime
  }

  setFinishTime(finishTime: number) {
    if (finishTime !== undefined && !this.validateTime(finishTime)) {
      throw new EntityError('finishTime')
    }
    this.props.finishTime = finishTime
  }

  get state() {
    return this.props.state ?? STATE.PENDING
  }

  setState(state: STATE) {
    if (!this.validateState(state)) {
      throw new EntityError('state')
    }
    this.props.state = state
  }

  private validateNotebookSerialNumber(notebookSerialNumber: string): boolean {
    return (
      notebookSerialNumber !== undefined &&
      notebookSerialNumber !== null &&
      typeof notebookSerialNumber === 'string' &&
      notebookSerialNumber.length > 0 &&
      notebookSerialNumber.length !== 0 &&
      notebookSerialNumber.length <= 50
    )
  }

  private validateStudentRA(studentRA: string): boolean {
    const raPattern = /^\d{2}\.\d{5}-[0-9]$/
    return raPattern.test(studentRA)
  }

  private validateTime(time: number | undefined): boolean {
    if (
      time === null ||
      time === undefined ||
      typeof time !== 'number' ||
      isNaN(time)
    ) {
      return false
    }

    const minValidTime = new Date('1970-01-01').getTime()
    const maxValidTime = new Date('2100-01-01').getTime()

    return time >= minValidTime && time <= maxValidTime
  }

  private validateState(state: STATE): boolean {
    return Object.values(STATE).includes(state)
  }
}
