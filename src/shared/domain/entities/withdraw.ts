import { EntityError } from '../../helpers/errors/domain_errors'

export interface WithdrawProps {
  withdrawId: number
  notebookSerialNumber: string
  studentRA: string
  withdrawalTime: number
  finishTime?: number
}
