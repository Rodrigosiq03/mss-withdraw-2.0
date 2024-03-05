import { describe, it, expect } from 'vitest'
import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { CreateViewmodel } from '../../../../src/modules/create_withdraw/app/create_withdraw_viewmodel'

describe('CreateViewmodel', () => {
  it('Should create viewmodel correctly', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      finishTime: 1704074150000,
      state: STATE.PENDING,
    })

    const viewModel = new CreateViewmodel(withdraw)

    const expectedViewModel = {
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      finishTime: 1704074150000,
      state: STATE.PENDING,
      message: 'The withdraw was created successfully',
    }

    expect(viewModel.toJSON()).toEqual(expectedViewModel)
  })

  it('Should create viewmodel with default values', () => {
    const withdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      state: STATE.PENDING,
    })

    const viewModel = new CreateViewmodel(withdraw)

    const expectedViewModel = {
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: undefined,
      finishTime: undefined,
      state: STATE.PENDING,
      message: 'The withdraw was created successfully',
    }

    expect(viewModel.toJSON()).toEqual(expectedViewModel)
  })
})