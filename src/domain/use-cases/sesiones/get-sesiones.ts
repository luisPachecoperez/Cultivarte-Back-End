import { Sesion, SesionRepository } from "../../";

export interface GetSesionesUseCase {
    execute(): Promise<Sesion[]>;
}

export class GetSesionesUseCaseImpl implements GetSesionesUseCase {
    
    constructor( 
        private sesionRepository: SesionRepository
    ) {}

    execute(): Promise<Sesion[]> {
        return this.sesionRepository.getAll();
    }
}