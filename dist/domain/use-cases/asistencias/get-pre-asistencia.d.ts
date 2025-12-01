import { PreAsistencia, AsistenciaRepository, RespuestaGrap } from '../../';
export interface GetPreAsistenciaUseCase {
    execute(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
}
export declare class GetPreAsistenciaUseCaseImpl implements GetPreAsistenciaUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
}
