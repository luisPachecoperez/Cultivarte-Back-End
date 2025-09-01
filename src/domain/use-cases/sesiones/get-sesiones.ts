import { Sesion, SesionRepository, RespuestaGrap } from "../../";

export interface GetSesionesUseCase {
    execute(): Promise<Sesion[] | RespuestaGrap>;
}

export class GetSesionesUseCaseImpl implements GetSesionesUseCase {
    
    constructor( 
        private sesionRepository: SesionRepository
    ) {}

    execute(): Promise<Sesion[] | RespuestaGrap> {
        return this.sesionRepository.getAll();
    }
}