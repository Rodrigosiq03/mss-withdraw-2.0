import { Notebook } from '@/shared/domain/entities/notebook'

export class CreateNotebookViewmodel {

  constructor() {
  }

  toJSON() {
    return {
      message: 'The notebook was created successfully',
    }
  }
}