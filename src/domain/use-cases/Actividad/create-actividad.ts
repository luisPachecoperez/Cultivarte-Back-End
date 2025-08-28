import { Actividad, ActividadRepository } from "../../";

export interface CreateActividadUseCase {
    execute( actividad: Actividad ): Promise<Actividad>;
}

export class CreateActividadUseCaseImpl implements CreateActividadUseCase {
    
    constructor(
        private actividadRepository: ActividadRepository
    ) {}

    async execute( actividad: Actividad ): Promise<Actividad> {
        return this.actividadRepository.createActividad( actividad );
    }
}