import { PreCreateActividad, ActividadRepository, RespuestaGrap } from '../..';
export interface GetPreCreateActividadUseCase {
    execute(id_usuario: string): Promise<PreCreateActividad | RespuestaGrap>;
}
export declare class GetPreCreateActividadUseCaseImpl implements GetPreCreateActividadUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(id_usuario: string): Promise<PreCreateActividad | RespuestaGrap>;
}
