/* eslint-disable @typescript-eslint/no-explicit-any */
import { Environments } from '../../../../src/shared/environments'
import { Notebook } from '../../../shared/domain/entities/notebook'
import { INotebookRepository } from '../../../shared/domain/repositories/notebook_repository_interface'
import { DynamoDatasource } from '../external/dynamo/datasources/dynamo_datasource'
import { NotebookDynamoDTO } from '../dto/notebook_dynamo_dto'

export class NotebookRepositoryDynamo implements INotebookRepository {
  static partitionKeyFormat(notebookSerialNumber: string): string {
    return `notebook#${notebookSerialNumber}`
  }

  static sortKeyFormat(notebookSerialNumber: string): string {
    return `#${notebookSerialNumber}`
  }

  constructor(
    private dynamo: DynamoDatasource = new DynamoDatasource(
      Environments.getEnvs().dynamoTableName,
      Environments.getEnvs().dynamoPartitionKey,
      Environments.getEnvs().region,
      undefined,
      undefined,
      Environments.getEnvs().endpointUrl,
      Environments.getEnvs().dynamoSortKey,
    ),
  ) {}

  async createNotebook(notebookSerialNumber: string): Promise<void> {
    const notebook = new Notebook({ notebookSerialNumber })
    const notebookDto = NotebookDynamoDTO.fromEntity(notebook)
    const notebookDynamo = notebookDto.toDynamo()

    await this.dynamo.putItem(
      notebookDynamo,
      NotebookRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      NotebookRepositoryDynamo.sortKeyFormat(notebookSerialNumber),
    )
  }

  async deleteNotebook(notebookSerialNumber: string): Promise<void> {
    await this.dynamo.deleteItem(
      NotebookRepositoryDynamo.partitionKeyFormat(notebookSerialNumber),
      NotebookRepositoryDynamo.sortKeyFormat(notebookSerialNumber)
    )
  }
}
