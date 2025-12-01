import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';
export interface UpdateAsistenciaUseCase {
    execute(id_asistencia: string, asistencia: Asistencia): Promise<RespuestaGrap>;
}
export declare class UpdateAsistenciaUseCaseImpl implements UpdateAsistenciaUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(id_asistencia: string, asistencia: Asistencia): Promise<RespuestaGrap>;
}
