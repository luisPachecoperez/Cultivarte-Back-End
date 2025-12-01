import { Actividad, ActividadRepository, RespuestaGrap } from '../..';
export interface GetActividadUseCase {
    execute(id_actividad: string): Promise<Actividad | RespuestaGrap>;
}
export declare class GetActividadUseCaseImpl implements GetActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_actividad: string): Promise<Actividad | RespuestaGrap>;
}
