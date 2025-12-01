import { AsistenciaSesiones, RespuestaGrap, AsistenciaRepository } from '../../';
export interface UpdateAsistenciasUseCase {
    execute(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap>;
}
export declare class UpdateAsistenciasUseCaseImpl implements UpdateAsistenciasUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap>;
}
