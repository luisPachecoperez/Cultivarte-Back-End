import { BeneficiarioRepository,Beneficiario} from "../../";


export interface GetBeneficiariosUseCase {
    execute(): Promise<Beneficiario[]>;
}

export class GetBeneficiariosUseCaseImpl implements GetBeneficiariosUseCase {
    constructor(
        private readonly beneficiarioRepository: BeneficiarioRepository
    ) {}

    execute(): Promise<Beneficiario[]> {
        return this.beneficiarioRepository.getAll();
    }
}