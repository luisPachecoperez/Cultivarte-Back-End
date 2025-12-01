import { Actividad, ActividadRepository, RespuestaGrap } from '../..';
export interface UpdateActividadUseCase {
    execute(id_actividad: string, actividad: Actividad): Promise<Actividad | RespuestaGrap>;
}
export declare class UpdateActividadUseCaseImpl implements UpdateActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_actividad: string, actividad: Actividad): Promise<Actividad | RespuestaGrap>;
}
