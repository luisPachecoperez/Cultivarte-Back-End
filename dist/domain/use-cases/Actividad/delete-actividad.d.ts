import { ActividadRepository, RespuestaGrap } from '../..';
export interface DeleteActividadUseCase {
    execute(id_actividad: string): Promise<RespuestaGrap>;
}
export declare class DeleteActividadUseCaseImpl implements DeleteActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_actividad: string): Promise<RespuestaGrap>;
}
