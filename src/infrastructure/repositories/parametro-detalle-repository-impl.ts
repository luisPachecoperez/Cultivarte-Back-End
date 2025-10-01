import {
  ParametroDetalle,
  ParametroDetalleDataSource,
  ParametroDetalleRepository,
  RespuestaGrap,
} from "../../domain";

export class ParametroDetalleRepositoryImpl
  implements ParametroDetalleRepository
{
  constructor(
    private readonly parametroDetalleDataSource: ParametroDetalleDataSource,
  ) {}

  getAll(): Promise<ParametroDetalle[] | RespuestaGrap> {
    return this.parametroDetalleDataSource.getAll();
  }

  getById(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleDataSource.getById(id_parametro_detalle);
  }

  create(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleDataSource.create(parametroDetalle);
  }

  updateById(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleDataSource.updateById(
      id_parametro_detalle,
      parametroDetalle,
    );
  }

  deleteById(id_parametro_detalle: string): Promise<RespuestaGrap> {
    return this.parametroDetalleDataSource.deleteById(id_parametro_detalle);
  }
}
