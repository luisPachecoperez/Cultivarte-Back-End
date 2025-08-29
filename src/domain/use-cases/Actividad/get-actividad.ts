import { Actividad, ActividadRepository } from "../../";


export interface GetActividadUseCase {
    execute( id_actividad: string ): Promise<Actividad | null>;
}

export class GetActividadUseCaseImpl implements GetActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_actividad: string ): Promise<Actividad | null> {
        return this.actividadRepository.getById( id_actividad );
    }
}