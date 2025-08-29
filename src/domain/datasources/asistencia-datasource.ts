import { Asistencia,
         AsistenciaSesiones,
         PreAsistencia,
         RespuestaGrap } from "../";


export interface AsistenciaDataSource {
    getAll(): Promise<Asistencia[]>;
    getById(id: string): Promise<Asistencia | null>;
    createAsistencia(asistencia: Asistencia): Promise<Asistencia>;
    updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap>;
    updateById(id: string, asistencia: Asistencia): Promise<Asistencia | null>;
    deleteById(id: string): Promise<boolean>;
    getPreAsistencia(id_sesion: string): Promise<PreAsistencia>;
}