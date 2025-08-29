import { PreCreateActividad, ActividadRepository } from '../../';

export interface PreCreateActividadUseCase {
    execute( id_usuario: string ): Promise<PreCreateActividad>;
}

export class PreCreateActividadUseCaseImpl implements PreCreateActividadUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_usuario: string ): Promise<PreCreateActividad> {
        return this.actividadRepository.getPreCreateActividad( id_usuario );
    }
}