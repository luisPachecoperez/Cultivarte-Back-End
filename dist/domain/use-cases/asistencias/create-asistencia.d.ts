import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';
export interface CreateAsistenciaUseCase {
    execute(asistencia: Asistencia): Promise<RespuestaGrap>;
}
export declare class CreateAsistenciaUseCaseImpl implements CreateAsistenciaUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(asistencia: Asistencia): Promise<RespuestaGrap>;
}
