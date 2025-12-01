import { ParametroDetalle, RespuestaGrap } from '../';

export interface ParametroDetalleDataSource {
  getAll(): Promise<ParametroDetalle[] | RespuestaGrap>;
  getById(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap>;
  create(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap>;
  updateById(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap>;
  deleteById(id_parametro_detalle: string): Promise<RespuestaGrap>;
}
