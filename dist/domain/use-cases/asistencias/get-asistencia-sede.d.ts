import { Asistencia, RespuestaGrap, AsistenciaRepository } from '../../';
export interface GetAsistenciasSedeUseCase {
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Asistencia[] | RespuestaGrap>;
}
export declare class GetAsistenciasSedeUseCaseImpl implements GetAsistenciasSedeUseCase {
    private readonly asistenciaRepository;
    constructor(asistenciaRepository: AsistenciaRepository);
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Asistencia[] | RespuestaGrap>;
}
