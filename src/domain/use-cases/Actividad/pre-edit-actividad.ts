import { PreEditActividad, ActividadRepository } from "../../";


export interface PreEditActividadUseCase {
    execute( id_actividad: string, id_usuario: string ): Promise<PreEditActividad>;
}

export class PreEditActividadUseCaseImpl implements PreEditActividadUseCase {
    
    constructor(
        private actividadRepository: ActividadRepository
    ) {}

    execute( id_actividad: string, id_usuario: string ): Promise<PreEditActividad> {
        return this.actividadRepository.getPreEditActividad( id_actividad, id_usuario );
    }
}
