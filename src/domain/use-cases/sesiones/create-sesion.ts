import { Sesion, SesionRepository } from "../../";

export interface CreateSesionUseCase {
    execute( sesion: Sesion ): Promise<Sesion>;
}

export class CreateSesionUseCaseImpl implements CreateSesionUseCase {
    
    constructor( 
        private sesionRepository: SesionRepository
    ) {}

    execute( sesion: Sesion ): Promise<Sesion> {
        return this.sesionRepository.createSesion( sesion );
    }
}