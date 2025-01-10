import { Withdraw } from '@/shared/domain/entities/withdraw'
export class CreateNotebookViewmodel {
  private notebook: Withdraw

  constructor(notebook: Withdraw) {
    this.notebook = notebook
  }

  toJSON() {
    return {
      notebookSerialNumber: this.notebook.notebookSerialNumber,
      message: 'The notebook was created successfully',
    }
  }
}