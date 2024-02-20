export enum STATE {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  INACTIVE = 'INACTIVE',
}

export function toEnum(value: string): STATE {
  switch (value) {
    case 'APPROVED':
      return STATE.APPROVED
    case 'PENDING':
      return STATE.PENDING
    case 'REJECTED':
      return STATE.REJECTED
    case 'INACTIVE':
      return STATE.INACTIVE
    default:
      throw new Error('Invalid value')
  }
}
