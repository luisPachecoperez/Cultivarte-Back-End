import { Actividad, ActividadRepository, ParametroDetalleRepository, RespuestaGrap } from '../..';
export interface CreateActividadAndSesionesUseCase {
    execute(actividad: Actividad): Promise<Actividad | RespuestaGrap>;
}
export declare class CreateActividadAndSesionesUseCaseImpl implements CreateActividadAndSesionesUseCase {
    private readonly actividadRepository;
    private readonly parametroDetalleRepository;
    constructor(actividadRepository: ActividadRepository, parametroDetalleRepository: ParametroDetalleRepository);
    execute(actividad: Actividad): Promise<Actividad | RespuestaGrap>;
}
