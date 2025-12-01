import { EditarSesiones, RespuestaGrap, Sesion } from '../';

export interface SesionesDataSource {
  getAll(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
  getById(id_sesion: string): Promise<Sesion | RespuestaGrap>;
  getSesionesSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Sesion[] | RespuestaGrap>;
  createSesion(sesion: Sesion): Promise<RespuestaGrap>;
  updateById(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
  updateSesiones(editarSesiones: EditarSesiones): Promise<RespuestaGrap>;
  deleteById(id_sesion: string): Promise<RespuestaGrap>;
}
