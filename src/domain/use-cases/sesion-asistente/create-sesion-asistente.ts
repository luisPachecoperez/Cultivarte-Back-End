import { SesionAsistente, SesionAsistenteRepository } from "../../";

export interface CreateSesionAsistenteUseCase {
    execute( sesionAsistente: SesionAsistente ): Promise<SesionAsistente>;
}

export class CreateSesionAsistenteUseCaseImpl implements CreateSesionAsistenteUseCase {
    constructor(
        private repository: SesionAsistenteRepository 
    ) {}

    async execute( sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.repository.create( sesionAsistente );
    }
}