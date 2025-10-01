import {
  AsistenciaRepository,
  Asistencia,
  AsistenciaDataSource,
  AsistenciaSesiones,
  PreAsistencia,
  RespuestaGrap,
} from "../../domain";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {
  constructor(private asistenciaDataSource: AsistenciaDataSource) {}

  getAll(): Promise<Asistencia[] | RespuestaGrap> {
    return this.asistenciaDataSource.getAll();
  }

  getById(id_asistencia: string): Promise<Asistencia | RespuestaGrap> {
    return this.asistenciaDataSource.getById(id_asistencia);
  }

  getAsistenciasSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Asistencia[] | RespuestaGrap> {
    return this.asistenciaDataSource.getAsistenciasSede(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }

  createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap> {
    return this.asistenciaDataSource.createAsistencia(asistencia);
  }

  updateAsistencias(
    asistenciaSesiones: AsistenciaSesiones,
  ): Promise<RespuestaGrap> {
    return this.asistenciaDataSource.updateAsistencias(asistenciaSesiones);
  }

  updateById(
    id_asistencia: string,
    asistencia: Asistencia,
  ): Promise<RespuestaGrap> {
    return this.asistenciaDataSource.updateById(id_asistencia, asistencia);
  }

  deleteById(id_asistencia: string): Promise<RespuestaGrap> {
    return this.asistenciaDataSource.deleteById(id_asistencia);
  }

  getPreAsistencia(id_sesion: string): Promise<PreAsistencia | RespuestaGrap> {
    return this.asistenciaDataSource.getPreAsistencia(id_sesion);
  }
}
