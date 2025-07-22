import { SesionRepository } from "../../";

export interface DeleteSesionUseCase {
    execute( id_sesion: string ): Promise<boolean>;
}

export class DeleteSesionUseCaseImpl implements DeleteSesionUseCase {
    constructor(
        private sesionRepository: SesionRepository
    ) {}

    async execute( id_sesion: string ): Promise<boolean> {
        return this.sesionRepository.deleteById( id_sesion );
    }
}