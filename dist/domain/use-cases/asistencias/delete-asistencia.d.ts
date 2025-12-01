import { AsistenciaRepository, RespuestaGrap } from '../../';
export interface DeleteAsistenciaUseCase {
    execute(id_asistencia: string): Promise<RespuestaGrap>;
}
export declare class DeleteAsistenciaUseCaseImpl implements DeleteAsistenciaUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(id_asistencia: string): Promise<RespuestaGrap>;
}
