import { ActividadRepository } from "../../repositories/actividad-repository";

export interface DeleteActividadUseCase {
    execute( id_actividad: string ): Promise<boolean>;
}

export class DeleteActividadUseCaseImpl implements DeleteActividadUseCase {
    constructor( 
        private repository: ActividadRepository
    ) {}

    execute( id_actividad: string ): Promise<boolean> {
        return this.repository.deleteById( id_actividad );
    }
}