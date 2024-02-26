import { describe, it, expect, beforeEach } from 'vitest'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'

describe('WithdrawRepositoryMock', () => {
  let repository: WithdrawRepositoryMock

  beforeEach(() => {
    repository = new WithdrawRepositoryMock()
  })

  it('should create withdraw', async () => {
    const notebookSerialNumber = 'GHI789'
    const state = STATE.PENDING
    const studentRA = '23.00555-7'
    const name = 'Matue'
    const initTime = Date.now()

    await expect(
      repository.createWithdraw(
        notebookSerialNumber,
        studentRA,
        name,
        initTime,
      ),
    ).resolves.toEqual(
      expect.objectContaining({
        notebookSerialNumber,
        state,
        studentRA,
        name,
        initTime,
      }),
    )
  })

  it('should create withdraw and change its state from inactive to pending', async () => {
    const notebookSerialNumber = 'ABC123'
    const state = STATE.PENDING

    await expect(
      repository.createWithdraw(notebookSerialNumber, '', '', 0),
    ).resolves.toEqual(
      expect.objectContaining({
        notebookSerialNumber,
        state,
      }),
    )
  })

  it('should get withdraw by NotebookSerialNumber', async () => {
    const withdraw =
      await repository.getWithdrawByNotebookSerialNumber('ABC123')

    expect(withdraw?.notebookSerialNumber).toEqual('ABC123')
  })

  it('should throw error when getting withdraw by non-existing RA', async () => {
    await expect(
      repository.getWithdrawByNotebookSerialNumber('non-existing-ra'),
    ).rejects.toThrow(NoItemsFound)
  })

  it('should get all withdraws', async () => {
    const withdraws = await repository.getAllWithdraws()

    expect(withdraws.length).toBe(4)
    expect(
      withdraws.some((withdraw) => withdraw.state === STATE.PENDING),
    ).toBeTruthy()
    expect(
      withdraws.some((withdraw) => withdraw.state === STATE.INACTIVE),
    ).toBeTruthy()
  })

  it('should update withdraw state to approved', async () => {
    const notebookSerialNumberToUpdate = 'MNO345'
    const updatedWithdraw = await repository.updateWithdrawByNotebookSerialNumber(
      notebookSerialNumberToUpdate,
      true,
    )

    expect(updatedWithdraw?.state).toBe(STATE.APPROVED)
  })

  it('should update withdraw state to inactive', async () => {
    const notebookSerialNumberToUpdate = 'MNO345'
    const updatedWithdraw = await repository.updateWithdrawByNotebookSerialNumber(
      notebookSerialNumberToUpdate,
      false,
    )

    expect(updatedWithdraw?.state).toBe(STATE.INACTIVE)
  })

  it('should throw error when updating withdraw with non-existing RA', async () => {
    await expect(
      repository.updateWithdrawByNotebookSerialNumber('non-existing-ra', true),
    ).rejects.toThrow(NoItemsFound)
  })
})
