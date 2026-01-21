import {
  Actividad,
  PreCreateActividad,
  PreEditActividad,
  RespuestaGrap,
} from '../';

export interface ActividadDataSource {
  getPreCreateActividad(
    id_usuario: string,
  ): Promise<PreCreateActividad | RespuestaGrap>;
  getPreEditActividad(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap>;
  getActividadSedes(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
    limit: number,
    offset: number,
  ): Promise<Actividad[] | RespuestaGrap>;
  getAll(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap>;
  getById(id_actividad: string): Promise<Actividad | RespuestaGrap>;
  createActividadAndSesiones(
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap>;
  createActividad(actividad: Actividad): Promise<RespuestaGrap>;
  updateById(
    id_actividad: string,
    actividad: Actividad,
  ): Promise<RespuestaGrap>;
  deleteById(id_actividad: string): Promise<RespuestaGrap>;
}
