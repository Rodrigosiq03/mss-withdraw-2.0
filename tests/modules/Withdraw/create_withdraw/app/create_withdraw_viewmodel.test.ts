import { describe, it, expect } from 'vitest'
import { Withdraw } from '../../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../../src/shared/domain/enums/state_enum'
import { CreateViewmodel } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_viewmodel'

describe('Assert Create Withdraw viewmodel is correct at all', () => {
  it('Should activate viewmodel correctly', async () => {
    const withdraw = new Withdraw({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      state: STATE.PENDING,
    })

    const withdrawViewmodel = new CreateViewmodel(withdraw).toJSON()

    expect(withdrawViewmodel).toEqual({
      withdrawId: '1',
      notebookSerialNumber: 'ABC123',
      studentRA: '23.00335-9',
      initTime: 1704074148000,
      finishTime: undefined,
      state: 'PENDING',
      message: 'The withdraw was created successfully',
    })
  })
})
