import { Actividad } from "../../entities/actividad";
import { ActividadRepository } from "../../repositories/actividad-repository";

export interface CreateActividadUseCase {
    execute( actividad: Actividad ): Promise<Actividad>;
}

export class CreateActividadUseCaseImpl implements CreateActividadUseCase {
    constructor( 
        private createActividadRepository: ActividadRepository
    ) {}

    execute( actividad: Actividad ): Promise<Actividad> {
        return this.createActividadRepository.create( actividad );
    }
}