import { AsistenciaRepository, Asistencia, AsistenciaDataSource, AsistenciaSesiones, PreAsistencia, RespuestaGrap } from '../../domain';
export declare class AsistenciaRepositoryImpl implements AsistenciaRepository {
    private readonly asistenciaDataSource;
    constructor(asistenciaDataSource: AsistenciaDataSource);
    getAll(): Promise<Asistencia[] | RespuestaGrap>;
    getById(id_asistencia: string): Promise<Asistencia | RespuestaGrap>;
    getAsistenciasSede(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Asistencia[] | RespuestaGrap>;
    createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap>;
    updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap>;
    updateById(id_asistencia: string, asistencia: Asistencia): Promise<RespuestaGrap>;
    deleteById(id_asistencia: string): Promise<RespuestaGrap>;
    getPreAsistencia(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
}
