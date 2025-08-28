import { Actividad, ActividadRepository} from "../../";


export interface UpdateActividadUseCase {
    execute( id_actividad: string, actividad: Actividad ): Promise<Actividad | null>;
}

export class UpdateActividadUseCaseImpl implements UpdateActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_actividad: string, actividad: Actividad ): Promise<Actividad | null> {
        return this.actividadRepository.updateById( id_actividad, actividad );
    }
}   