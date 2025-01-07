export interface INotebookRepository {
    createNotebook(notebookSerialNumber: string): Promise<void>
    deleteNotebook(notebookSerialNumber: string): Promise<void>
}