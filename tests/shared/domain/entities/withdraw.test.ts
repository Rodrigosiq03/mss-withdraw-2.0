import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { describe, it, expect } from 'vitest'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('[Withdraw Entity Tests]', () => {
  it('Assert Withdraw Entity is correct at all', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123', 
      state: STATE.PENDING,
    })

    expect(withdraw).toBeInstanceOf(Withdraw)
  })

  it('Assert Withdraw Entity has an error when notebookSerialNumber is invalid', () => {
    expect(() => {
      new Withdraw({
        notebookSerialNumber: '',
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        notebookSerialNumber: '',
        state: STATE.PENDING,
      })
    }).toThrowError('Field notebookSerialNumber is not valid') 
  })

  it('Assert Withdraw Entity has no error when studentRA is undefined', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.PENDING,
    })

    expect(withdraw.studentRA).toBeUndefined()
  })

  it('Assert Withdraw Entity has no error when name is undefined', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.PENDING,
    })

    expect(withdraw.name).toBeUndefined()
  })

  it('Assert Withdraw Entity has no error when initTime is undefined', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.PENDING,
    })

    expect(withdraw.initTime).toBeUndefined()
  })

  it('Assert Withdraw Entity has no error when finishTime is undefined', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.PENDING,
    })

    expect(withdraw.finishTime).toBeUndefined()
  })

  it('Assert Withdraw Entity has an error when finishTime is invalid', () => {
    expect(() => {
      new Withdraw({
        notebookSerialNumber: 'ABC123',
        state: STATE.PENDING,
        finishTime: -1,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        notebookSerialNumber: 'ABC123',
        state: STATE.PENDING,
        finishTime: -1,
      })
    }).toThrowError('Field finishTime is not valid') 
  })
})
