import notebooks from '../infra/jsons/notebooks.json'
import { Withdraw } from '../domain/entities/withdraw'
import { STATE } from '../domain/enums/state_enum'

export function generateAllWithdrawsFromJson() {
  const withdraws: Withdraw[] = []
  for (const notebook of notebooks) {
    const withdraw = new Withdraw({
      notebookSerialNumber: notebook.notebookSerialNumber,
      state: STATE.INACTIVE,
    })
    withdraws.push(withdraw)
  }
  return withdraws
}
