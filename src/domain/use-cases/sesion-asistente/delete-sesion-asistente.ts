import { SesionAsistenteRepository } from "../../";

export interface DeleteSesionAsistenteUseCase {
    execute( id_sesion_asistente: string ): Promise<boolean>;
}

export class DeleteSesionAsistenteUseCaseImpl implements DeleteSesionAsistenteUseCase {
    constructor(
        private repository: SesionAsistenteRepository 
    ) {}

    async execute( id_sesion_asistente: string ): Promise<boolean> {
        return this.repository.deleteById( id_sesion_asistente );
    }
}