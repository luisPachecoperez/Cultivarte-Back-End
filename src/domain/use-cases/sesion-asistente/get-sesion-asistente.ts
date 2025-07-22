import { SesionAsistente, SesionAsistenteRepository } from "../../";

export interface GetSesionAsistenteUseCase {
    execute( id_sesion_asistente: string ): Promise<SesionAsistente | null>;
}

export class GetSesionAsistenteUseCaseImpl implements GetSesionAsistenteUseCase {
    constructor(
        private repository: SesionAsistenteRepository 
    ) {}

    async execute( id_sesion_asistente: string ): Promise<SesionAsistente | null> {
        return this.repository.getById( id_sesion_asistente );
    }
}