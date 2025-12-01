import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../../';

export interface GetParametroDetalleUseCase {
  execute(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap>;
}

export class GetParametroDetalleUseCaseImpl
  implements GetParametroDetalleUseCase
{
  constructor(
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  execute(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleRepository.getById(id_parametro_detalle);
  }
}
