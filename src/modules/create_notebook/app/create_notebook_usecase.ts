import { Notebook } from '../../../../src/shared/domain/entities/notebook'
import { INotebookRepository } from '../../../../src/shared/domain/repositories/notebook_repository_interface'
import { EntityError } from '../../../../src/shared/helpers/errors/domain_errors'

export class CreateNotebookUsecase {
  constructor(private repo: INotebookRepository) {}

  async execute(
    notebookSerialNumber: string,
  ) {
    if (!Notebook.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    const NotebookUpdated = await this.repo.createNotebook(
      notebookSerialNumber,
    )

    return NotebookUpdated
  }
}