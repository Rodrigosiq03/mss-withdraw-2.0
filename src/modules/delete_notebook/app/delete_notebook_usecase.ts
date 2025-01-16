import { IWithdrawRepository } from "@/shared/domain/repositories/withdraw_repository_interface"
import { EntityError } from "../../../shared/helpers/errors/domain_errors"

export class DeleteNotebookUseCase {
    constructor(private notebookRepository: IWithdrawRepository) {}
    
    async execute(notebookId: string): Promise<void> {
    
        await this.notebookRepository.deleteNotebook(notebookId)
    }
}