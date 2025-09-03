import { ActividadRepository, RespuestaGrap } from "../..";

export interface DeleteActividadUseCase {
    execute( id_actividad: string ): Promise<RespuestaGrap>;
}

export class DeleteActividadUseCaseImpl implements DeleteActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_actividad: string ): Promise<RespuestaGrap> {
        console.log(id_actividad);
        return this.actividadRepository.deleteById( id_actividad );
    }
}