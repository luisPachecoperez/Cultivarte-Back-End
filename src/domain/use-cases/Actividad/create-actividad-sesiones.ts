import { Actividad,
         ActividadRepository,
         ParametroDetalleRepository } from "../../";

export interface CreateActividadAndSesionesUseCase {
    execute( actividad: Actividad ): Promise<Actividad>;
}

export class CreateActividadAndSesionesUseCaseImpl implements CreateActividadAndSesionesUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository,
        private readonly parametroDetalleRepository: ParametroDetalleRepository
    ) {}

    async execute( actividad: Actividad ): Promise<Actividad> {
        const frecuencia = await this.parametroDetalleRepository.getById( actividad.id_frecuencia );
        actividad.frecuencia = frecuencia?.nombre || '';
        
        return this.actividadRepository.createActividadAndSesiones( actividad );
    }
}