import { describe, it, expect, beforeEach } from 'vitest'
import { Withdraw } from '../../../../src/shared/domain/entities/withdraw'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import { WithdrawRepositoryMock } from '../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { NoItemsFound } from '../../../../src/shared/helpers/errors/usecase_errors'

describe('WithdrawRepositoryMock', () => {
  let repository: WithdrawRepositoryMock

  beforeEach(() => {
    repository = new WithdrawRepositoryMock()
  })

  it('should create withdraw', async () => {
    const newWithdraw = new Withdraw({
      notebookSerialNumber: 'GHI789',
      studentRA: '23.00555-7',
      name: 'Matue',
      initTime: Date.now(),
      state: STATE.PENDING,
    })

    await expect(repository.createWithdraw(newWithdraw)).resolves.toEqual(
      newWithdraw,
    )
  })

  it('should create withdraw and change its state from inactive to pending', async () => {
    const newWithdraw = new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.INACTIVE,
    })

    await expect(repository.createWithdraw(newWithdraw)).resolves.toEqual(
      expect.objectContaining({
        notebookSerialNumber: 'ABC123',
        state: STATE.PENDING,
      }),
    )
  })

  it('should get withdraw by RA', async () => {
    const withdraw = await repository.getWithdrawByRA('23.00555-7')

    expect(withdraw?.studentRA).toEqual('23.00555-7')
  })

  it('should throw error when getting withdraw by non-existing RA', async () => {
    await expect(repository.getWithdrawByRA('non-existing-ra')).rejects.toThrow(
      NoItemsFound,
    )
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
    const raToUpdate = '23.00555-7'
    const updatedWithdraw = await repository.updateWithdrawByRA(
      raToUpdate,
      true,
    )

    expect(updatedWithdraw?.state).toBe(STATE.APPROVED)
  })

  it('should update withdraw state to inactive', async () => {
    const raToUpdate = '23.00555-7'
    const updatedWithdraw = await repository.updateWithdrawByRA(
      raToUpdate,
      false,
    )

    expect(updatedWithdraw?.state).toBe(STATE.INACTIVE)
  })

  it('should throw error when updating withdraw with non-existing RA', async () => {
    await expect(
      repository.updateWithdrawByRA('non-existing-ra', true),
    ).rejects.toThrow(NoItemsFound)
  })
})
