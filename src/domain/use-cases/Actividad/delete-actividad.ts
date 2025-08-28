import { ActividadRepository } from "../../";

export interface DeleteActividadUseCase {
    execute( id_actividad: string ): Promise<boolean>;
}

export class DeleteActividadUseCaseImpl implements DeleteActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_actividad: string ): Promise<boolean> {
        return this.actividadRepository.deleteById( id_actividad );
    }
}