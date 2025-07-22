import { BeneficiarioRepository,Beneficiario } from "../../";

export interface UpdateBeneficiarioUseCase {
    execute( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario>;
}

export class UpdateBeneficiarioUseCaseImpl implements UpdateBeneficiarioUseCase {
    constructor(
        private readonly beneficiarioRepository: BeneficiarioRepository
    ) {}

    execute( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.beneficiarioRepository.updateById( id_beneficiario, beneficiario );
    }
}