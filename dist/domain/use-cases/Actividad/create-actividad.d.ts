import { Actividad, ActividadRepository, RespuestaGrap } from '../..';
export interface CreateActividadUseCase {
    execute(actividad: Actividad): Promise<RespuestaGrap>;
}
export declare class CreateActividadUseCaseImpl implements CreateActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(actividad: Actividad): Promise<RespuestaGrap>;
}
