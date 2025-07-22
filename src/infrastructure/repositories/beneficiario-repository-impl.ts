import { Beneficiario } from "../../domain";
import { BeneficiarioDataSource } from "../../domain";
import { BeneficiarioRepository } from "../../domain";

export class BeneficiarioRepositoryImpl implements BeneficiarioRepository {
    
    constructor(
        private readonly beneficiarioDataSource: BeneficiarioDataSource
    ) {}

    getAll(): Promise<Beneficiario[]> {
        return this.beneficiarioDataSource.getAll();
    }

    getById( id_beneficiario: string ): Promise<Beneficiario | null> {
        return this.beneficiarioDataSource.getById( id_beneficiario );
    }

    create( beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.beneficiarioDataSource.create ( beneficiario );
    }

    updateById( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.beneficiarioDataSource.updateById ( id_beneficiario, beneficiario );
    }

    deleteById( id_beneficiario: string ): Promise<boolean> {
        return this.beneficiarioDataSource.deleteById( id_beneficiario );
    }
}
