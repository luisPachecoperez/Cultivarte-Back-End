import { Beneficiario } from "../";

export interface BeneficiarioRepository {
    getAll(): Promise<Beneficiario[]>;
    getById( id_beneficiario: string ): Promise<Beneficiario | null>;
    create( beneficiario: Beneficiario ): Promise<Beneficiario>;
    updateById( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario>;
    deleteById( id_beneficiario: string ): Promise<boolean>; 
}
