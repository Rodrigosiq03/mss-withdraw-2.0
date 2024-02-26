/* eslint-disable @typescript-eslint/no-explicit-any */
import { Withdraw } from '../../domain/entities/withdraw'
import { STATE } from '../../domain/enums/state_enum'

type WithdrawDynamoDTOProps = {
  notebookSerialNumber: string
  name?: string
  studentRA?: string
  state: STATE
  initTime?: number
  finishTime?: number
}

export class WithdrawDynamoDTO {
  private notebookSerialNumber: string
  private name?: string 
  private studentRA?: string
  private state: STATE
  private initTime?: number
  private finishTime?: number


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
      name: withdraw.name ?? '',
      studentRA: withdraw.studentRA ?? '',
      state: withdraw.state as STATE,
      initTime: withdraw.initTime ?? 0,
      finishTime: withdraw.finishTime ?? 0
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

  static fromDynamo(withdrawData: any) {
    const notebookSerialNumber = withdrawData['notebookSerialNumber'] && 
      withdrawData['notebookSerialNumber']['S'] ? 
      withdrawData['notebookSerialNumber']['S'] : 
      undefined
    const name = withdrawData['name'] && 
      withdrawData['name']['S'] ? 
      withdrawData['name']['S'] : 
      undefined
    const studentRA = withdrawData['studentRA'] && 
      withdrawData['studentRA']['S'] ? 
      withdrawData['studentRA']['S'] : 
      undefined
    const state = withdrawData['state'] && 
      withdrawData['state']['S'] ? 
      withdrawData['state']['S'] : 
      undefined
    const initTime = withdrawData['initTime'] && 
      withdrawData['initTime']['N'] ? 
      Number(withdrawData['initTime']['N']) : 
      undefined
    const finishTime = withdrawData['finishTime'] && 
      withdrawData['finishTime']['N'] ? 
      Number(withdrawData['finishTime']['N']) : 
      undefined
    return new WithdrawDynamoDTO({
      notebookSerialNumber,
      name,
      studentRA,
      state,
      initTime,
      finishTime
    })
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