import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';
export interface GetAsistenciasUseCase {
    execute(): Promise<Asistencia[] | RespuestaGrap>;
}
export declare class GetAsistenciasUseCaseImpl implements GetAsistenciasUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(): Promise<Asistencia[] | RespuestaGrap>;
}
