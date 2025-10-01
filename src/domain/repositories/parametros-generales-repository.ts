import { ParametrosGenerales, RespuestaGrap } from "../";

export interface ParametrosGeneralesRepository {
  getAll(): Promise<ParametrosGenerales[] | RespuestaGrap>;
  getById(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap>;
  create(parametrosGenerales: ParametrosGenerales): Promise<RespuestaGrap>;
  updateById(
    id_parametro_general: string,
    parametrosGenerales: ParametrosGenerales,
  ): Promise<RespuestaGrap>;
  deleteById(id_parametro_general: string): Promise<RespuestaGrap>;
}
