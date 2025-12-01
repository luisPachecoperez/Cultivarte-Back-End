import { PreEditActividad, ActividadRepository, RespuestaGrap } from '../..';
export interface GetPreEditActividadUseCase {
    execute(id_actividad: string, id_usuario: string): Promise<PreEditActividad | RespuestaGrap>;
}
export declare class GetPreEditActividadUseCaseImpl implements GetPreEditActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_actividad: string, id_usuario: string): Promise<PreEditActividad | RespuestaGrap>;
}
