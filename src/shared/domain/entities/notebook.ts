import { EntityError } from '../../helpers/errors/domain_errors'

export interface NotebookProps {
  notebookSerialNumber: string
}

export class Notebook {
  constructor(public props: NotebookProps) {
    this.validateProps(props)
  }

  private validateProps(props: NotebookProps) {
    if (!Notebook.validateNotebookSerialNumber(props.notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
  }

  get notebookSerialNumber() {
    return this.props.notebookSerialNumber
  }

  setNotebookSerialNumber(notebookSerialNumber: string) {
    if (!Notebook.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    this.props.notebookSerialNumber = notebookSerialNumber
  }

  static validateNotebookSerialNumber(notebookSerialNumber?: string | null): boolean {
    return (
      typeof notebookSerialNumber === 'string' &&
      notebookSerialNumber.length > 0 &&
      notebookSerialNumber.length <= 50
    )
  }
}
