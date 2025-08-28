import { Sesion, SesionRepository } from "../../";

export interface GetSesionUseCase {
    execute( id_sesion: string ): Promise<Sesion | null>;
}

export class GetSesionUseCaseImpl implements GetSesionUseCase {
    
    constructor( 
        private sesionRepository: SesionRepository
    ) {}

    execute( id_sesion: string ): Promise<Sesion | null> {
        return this.sesionRepository.getById( id_sesion );
    }
}