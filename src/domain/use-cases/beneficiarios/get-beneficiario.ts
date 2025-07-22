import { BeneficiarioRepository,Beneficiario } from "../../index";

export interface GetBeneficiarioUseCase {
    execute( id_beneficiario: string ): Promise<Beneficiario | null>;
}

export class GetBeneficiarioUseCaseImpl implements GetBeneficiarioUseCase {
    constructor(
        private readonly beneficiarioRepository: BeneficiarioRepository
    ) {}

    execute( id_beneficiario: string ): Promise<Beneficiario | null> {
        return this.beneficiarioRepository.getById( id_beneficiario );
    }
}