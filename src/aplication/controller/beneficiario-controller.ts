import {Beneficiario,
         CreateBeneficiarioUseCase,
         DeleteBeneficiarioUseCase,
         GetBeneficiarioUseCase,
         GetBeneficiariosUseCase,
         UpdateBeneficiarioUseCase } from "../../domain";

export class BeneficiarioController {
    constructor(
        private createBeneficiarioUseCase: CreateBeneficiarioUseCase,
        private getBeneficiariosUseCase: GetBeneficiariosUseCase,
        private getBeneficiarioUseCase: GetBeneficiarioUseCase,
        private updateBeneficiarioUseCase: UpdateBeneficiarioUseCase,
        private deleteBeneficiarioUseCase: DeleteBeneficiarioUseCase
    ) {}

    async createBeneficiario( beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.createBeneficiarioUseCase.execute( beneficiario );
    }

    async getBeneficiarios(): Promise<Beneficiario[]> {
        return this.getBeneficiariosUseCase.execute();
    }

    async getBeneficiario( id_beneficiario: string ): Promise<Beneficiario | null> {
        return this.getBeneficiarioUseCase.execute( id_beneficiario );
    }

    async updateBeneficiario( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario> {
        return this.updateBeneficiarioUseCase.execute( id_beneficiario, beneficiario );
    }

    async deleteBeneficiario( id_beneficiario: string ): Promise<boolean> {
        return this.deleteBeneficiarioUseCase.execute( id_beneficiario );
    }
}