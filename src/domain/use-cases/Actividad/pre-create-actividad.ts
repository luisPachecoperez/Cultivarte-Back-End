import { PreCreateActividad, ActividadRepository } from '../..';

export interface PreCreateActividadUseCase {
    execute( id_usuario: string ): Promise<PreCreateActividad>;
}

export class PreCreateActividadUseCaseImpl implements PreCreateActividadUseCase {
    constructor( 
        private repository: ActividadRepository
    ) {}

    execute( id_usuario: string ): Promise<PreCreateActividad> {
        return this.repository.getPreCreateActividadData( id_usuario );
    }
}