import { Beneficiario,BeneficiarioRepository } from "../../";


export interface CreateBeneficiarioUseCase {
    execute( beneficiario: Beneficiario ): Promise<Beneficiario>;
}

export class CreateBeneficiarioUseCaseImpl implements CreateBeneficiarioUseCase {
    constructor(
        private readonly beneficiarioRepository: BeneficiarioRepository
    ) {}

    execute( beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.beneficiarioRepository.create( beneficiario );
    }  
}