import { Actividad, ActividadRepository, RespuestaGrap } from '../..';
export interface GetActividadSedesUseCase {
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Actividad[] | RespuestaGrap>;
}
export declare class GetActividadSedesUseCaseImpl implements GetActividadSedesUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Actividad[] | RespuestaGrap>;
}
