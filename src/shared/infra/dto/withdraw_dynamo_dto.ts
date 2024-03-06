/* eslint-disable @typescript-eslint/no-explicit-any */
import { Withdraw } from '../../domain/entities/withdraw'
import { STATE } from '../../domain/enums/state_enum'

type WithdrawDynamoDTOProps = {
  notebookSerialNumber: string
  name?: string | null
  studentRA?: string | null
  state: STATE
  initTime?: number | null
  finishTime?: number | null
}

export class WithdrawDynamoDTO {
  private notebookSerialNumber: string
  private name?: string | null
  private studentRA?: string | null
  private state: STATE
  private initTime?: number | null
  private finishTime?: number | null


  constructor (props: WithdrawDynamoDTOProps) {
    this.notebookSerialNumber = props.notebookSerialNumber
    this.name = props.name
    this.studentRA = props.studentRA
    this.state = props.state
    this.initTime = props.initTime
    this.finishTime = props.finishTime
  }

  static fromEntity(withdraw: Withdraw):WithdrawDynamoDTO {
    return new WithdrawDynamoDTO({
      notebookSerialNumber: withdraw.notebookSerialNumber,
      name: withdraw.name,
      studentRA: withdraw.studentRA,
      state: withdraw.state as STATE,
      initTime: withdraw.initTime,
      finishTime: withdraw.finishTime
    })
  }

  toDynamo() {
    return {
      'entity': 'withdraw',
      'notebookSerialNumber': this.notebookSerialNumber,
      'name': this.name,
      'studentRA': this.studentRA,
      'state': this.state,
      'initTime': this.initTime,
      'finishTime': this.finishTime
    }
  }

  static fromDynamo(withdrawData: any): WithdrawDynamoDTO {
    const notebookSerialNumber = WithdrawDynamoDTO.extractStringValue(withdrawData, 'notebookSerialNumber')
    const name = WithdrawDynamoDTO.extractStringValue(withdrawData, 'name')
    const studentRA = WithdrawDynamoDTO.extractStringValue(withdrawData, 'studentRA')
    const state = WithdrawDynamoDTO.extractStringValue(withdrawData, 'state') as STATE
    const initTime = WithdrawDynamoDTO.extractNumberValue(withdrawData, 'initTime')
    const finishTime = WithdrawDynamoDTO.extractNumberValue(withdrawData, 'finishTime')

    console.log('fromDynamo - ', notebookSerialNumber, name, studentRA, state, initTime, finishTime)
    if (!notebookSerialNumber || !state) {
      throw new Error('Invalid withdraw data')
    }

    return new WithdrawDynamoDTO({
      notebookSerialNumber,
      name,
      studentRA,
      state,
      initTime,
      finishTime
    })
  }

  private static extractStringValue(data: any, key: string): string | undefined {
    if (data[key] && data[key].S) {
      return data[key].S
    }
    return undefined
  }

  private static extractNumberValue(data: any, key: string): number | undefined {
    if (data[key] && data[key].N) {
      return parseInt(data[key].N)
    }
    return undefined
  }

  toEntity() {
    return new Withdraw({
      notebookSerialNumber: this.notebookSerialNumber,
      name: this.name,
      studentRA: this.studentRA,
      state: this.state,
      initTime: this.initTime,
      finishTime: this.finishTime
    })
  }
}