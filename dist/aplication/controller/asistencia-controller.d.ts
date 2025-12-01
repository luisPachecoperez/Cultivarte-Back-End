import { Asistencia, GetAsistenciaUseCase, GetAsistenciasUseCase, GetAsistenciasSedeUseCase, CreateAsistenciaUseCase, UpdateAsistenciaUseCase, DeleteAsistenciaUseCase, UpdateAsistenciasUseCase, PreAsistencia, GetPreAsistenciaUseCase, AsistenciaSesiones, RespuestaGrap } from '../../domain';
export declare class AsistenciasController {
    private readonly getAsistenciasUseCase;
    private readonly getAsistenciaUseCase;
    private readonly getAsistenciasSedeUseCase;
    private readonly getPreAsistenciaUseCase;
    private readonly createAsistenciaUseCase;
    private readonly updateAsistenciaUseCase;
    private readonly updateAsistenciasUseCase;
    private readonly deleteAsistenciaUseCase;
    constructor(getAsistenciasUseCase: GetAsistenciasUseCase, getAsistenciaUseCase: GetAsistenciaUseCase, getAsistenciasSedeUseCase: GetAsistenciasSedeUseCase, getPreAsistenciaUseCase: GetPreAsistenciaUseCase, createAsistenciaUseCase: CreateAsistenciaUseCase, updateAsistenciaUseCase: UpdateAsistenciaUseCase, updateAsistenciasUseCase: UpdateAsistenciasUseCase, deleteAsistenciaUseCase: DeleteAsistenciaUseCase);
    getAsistencias(): Promise<Asistencia[] | RespuestaGrap>;
    getAsistencia(id_asistencia: string): Promise<Asistencia | RespuestaGrap>;
    getAsistenciasSede(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Asistencia[] | RespuestaGrap>;
    getPreAsistencia(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
    createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap>;
    updateAsistencia(id_asistencia: string, asistencia: Asistencia): Promise<RespuestaGrap>;
    updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap>;
    deleteAsistencia(id_asistencia: string): Promise<RespuestaGrap>;
}
