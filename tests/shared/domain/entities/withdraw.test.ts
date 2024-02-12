import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'
import { describe, it, expect } from 'vitest'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'

describe('[Withdraw Entity Tests]', () => {
  it('Assert Withdraw Entity is correct at all', () => {
    const withdraw = new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: Date.now(),
      state: STATE.PENDING,
    })

    expect(withdraw).toBeInstanceOf(Withdraw)
  })

  it('Assert Withdraw Entity has an error when withdrawId is invalid', () => {
    expect(() => {
      new Withdraw({
        withdrawId: '',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        withdrawId: '',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError('Field props.withdrawId is not valid')
  })

  it('Assert Withdraw Entity has an error when notebookSerialNumber is invalid', () => {
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: '',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: '',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError('Field props.notebookSerialNumber is not valid')
  })

  it('Assert Withdraw Entity has an error when studentRA is invalid', () => {
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '',
        initTime: Date.now(),
        state: STATE.PENDING,
      })
    }).toThrowError('Field props.studentRA is not valid')
  })

  it('Assert Withdraw Entity has an error when initTime is invalid', () => {
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: -1,
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: -1,
        state: STATE.PENDING,
      })
    }).toThrowError('Field props.initTime is not valid')
  })

  it('Assert Withdraw Entity has no error when finishTime is undefined', () => {
    const withdraw = new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: Date.now(),
      state: STATE.PENDING,
    })

    expect(withdraw.finishTime).toBeUndefined()
  })

  it('Assert Withdraw Entity has an error when finishTime is invalid', () => {
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        finishTime: -1,
        state: STATE.PENDING,
      })
    }).toThrowError(EntityError)
    expect(() => {
      new Withdraw({
        withdrawId: '1',
        notebookSerialNumber: 'ABC123',
        studentRA: '23.00335-9',
        initTime: Date.now(),
        finishTime: -1,
        state: STATE.PENDING,
      })
    }).toThrowError('Field props.finishTime is not valid')
  })
})
