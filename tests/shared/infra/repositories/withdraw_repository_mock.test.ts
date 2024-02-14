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
      withdrawId: '3',
      notebookSerialNumber: 'GHI789',
      studentRA: '23.00555-7',
      initTime: Date.now(),
      state: STATE.PENDING,
    })

    await expect(repository.createWithdraw(newWithdraw)).resolves.toEqual(
      newWithdraw,
    )
  })

  it('should get withdraw by RA', async () => {
    const withdraw = await repository.getWithdrawByRA('23.00335-9')

    expect(withdraw?.studentRA).toEqual('23.00335-9')
  })

  it('should throw error when getting withdraw by non-existing RA', async () => {
    await expect(repository.getWithdrawByRA('non-existing-ra')).rejects.toThrow(
      NoItemsFound,
    )
  })

  it('should get all withdraws', async () => {
    const withdraws = await repository.getAllWithdraws()

    expect(withdraws.length).toBe(2)
  })

  it('should delete withdraw by RA', async () => {
    const raToDelete = '23.00335-9'
    await expect(repository.deleteWithdrawByRA(raToDelete)).resolves.toBe(true)

    const withdrawsAfterDelete = await repository.getAllWithdraws()
    expect(
      withdrawsAfterDelete.find(
        (withdraw) => withdraw.studentRA === raToDelete,
      ),
    ).toBeUndefined()
  })

  it('should throw error when deleting withdraw with non-existing RA', async () => {
    await expect(
      repository.deleteWithdrawByRA('non-existing-ra'),
    ).rejects.toThrow(NoItemsFound)
  })
})
