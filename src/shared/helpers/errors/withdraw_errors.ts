import { BaseError } from './base_error'

export class WithdrawInUse extends BaseError {
  constructor() {
    super('The notebook is already in use')
  }
}

export class UpdateWithdrawStateInvalid extends BaseError {
  constructor() {
    super('The notebook has a state that does not allow this action')
  }

}

export class FinishWithdrawStateInvalid extends BaseError {
  constructor() {
    super('The notebook has not been used')
  }
}