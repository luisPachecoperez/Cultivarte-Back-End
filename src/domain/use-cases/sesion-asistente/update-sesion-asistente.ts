import { SesionAsistente, SesionAsistenteRepository } from "../../";

export interface UpdateSesionAsistenteUseCase {
    execute( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente>;
}

export class UpdateSesionAsistenteUseCaseImpl implements UpdateSesionAsistenteUseCase {
    constructor(
        private repository: SesionAsistenteRepository 
    ) {}

    async execute( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.repository.updateById( id_sesion_asistente, sesionAsistente );
    }
}