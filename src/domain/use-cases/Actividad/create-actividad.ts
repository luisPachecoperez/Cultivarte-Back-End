import { Actividad,
         ActividadRepository,
         RespuestaGrap } from "../..";

export interface CreateActividadUseCase {
    execute( actividad: Actividad ): Promise<RespuestaGrap>;
}

export class CreateActividadUseCaseImpl implements CreateActividadUseCase {
    
    constructor(
        private actividadRepository: ActividadRepository
    ) {}

    async execute( actividad: Actividad ): Promise<RespuestaGrap> {
        return this.actividadRepository.createActividad( actividad );
    }
}