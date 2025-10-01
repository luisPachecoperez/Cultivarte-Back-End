import {
  Asistencia,
  AsistenciaSesiones,
  PreAsistencia,
  RespuestaGrap,
} from "../";

export interface AsistenciaRepository {
  getAll(): Promise<Asistencia[] | RespuestaGrap>;
  getById(id: string): Promise<Asistencia | RespuestaGrap>;
  getAsistenciasSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Asistencia[] | RespuestaGrap>;
  getPreAsistencia(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
  createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap>;
  updateAsistencias(
    asistenciaSesiones: AsistenciaSesiones,
  ): Promise<RespuestaGrap>;
  updateById(id: string, asistencia: Asistencia): Promise<RespuestaGrap>;
  deleteById(id: string): Promise<RespuestaGrap>;
}
