import { BeneficiarioRepository } from "../../";

export interface DeleteBeneficiarioUseCase {
    execute( id_beneficiario: string ): Promise<boolean>;
}

export class DeleteBeneficiarioUseCaseImpl implements DeleteBeneficiarioUseCase {
    constructor(
        private readonly beneficiarioRepository: BeneficiarioRepository
    ) {}

    execute( id_beneficiario: string ): Promise<boolean> {
        return this.beneficiarioRepository.deleteById( id_beneficiario );
    }
}