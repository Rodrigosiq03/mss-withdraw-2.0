/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notebook } from '../../domain/entities/notebook'

type NotebookDynamoDTOProps = {
  notebookSerialNumber: string
}

export class NotebookDynamoDTO {
  private notebookSerialNumber: string

  constructor(props: NotebookDynamoDTOProps) {
    this.notebookSerialNumber = props.notebookSerialNumber
  }

  static fromEntity(notebook: Notebook): NotebookDynamoDTO {
    return new NotebookDynamoDTO({
      notebookSerialNumber: notebook.notebookSerialNumber
    })
  }

  toDynamo() {
    return {
      'entity': 'notebook',
      'notebookSerialNumber': this.notebookSerialNumber
    }
  }

  static fromDynamo(notebookData: any): NotebookDynamoDTO {
    const notebookSerialNumber = NotebookDynamoDTO.extractStringValue(notebookData, 'notebookSerialNumber')

    if (!notebookSerialNumber) {
      throw new Error('Invalid notebook data')
    }

    return new NotebookDynamoDTO({ notebookSerialNumber })
  }

  private static extractStringValue(data: any, key: string): string | undefined {
    if (data[key] && data[key].S) {
      return data[key].S
    }
    return undefined
  }

  toEntity() {
    return new Notebook({
      notebookSerialNumber: this.notebookSerialNumber
    })
  }
}
