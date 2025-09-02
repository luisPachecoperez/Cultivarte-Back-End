import { PreCreateActividad, ActividadRepository, RespuestaGrap } from '../..';

export interface GetPreCreateActividadUseCase {
    execute( id_usuario: string ): Promise<PreCreateActividad | RespuestaGrap>;
}

export class GetPreCreateActividadUseCaseImpl implements GetPreCreateActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_usuario: string ): Promise<PreCreateActividad | RespuestaGrap> {
        return this.actividadRepository.getPreCreateActividad( id_usuario );
    }
}