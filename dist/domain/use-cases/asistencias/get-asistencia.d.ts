import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';
export interface GetAsistenciaUseCase {
    execute(id_asistencia: string): Promise<Asistencia | RespuestaGrap>;
}
export declare class GetAsistenciaUseCaseImpl implements GetAsistenciaUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(id_asistencia: string): Promise<Asistencia | RespuestaGrap>;
}
