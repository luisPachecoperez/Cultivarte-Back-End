import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../../';

export interface UpdateParametroDetalleUseCase {
  execute(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap>;
}

export class UpdateParametroDetalleUseCaseImpl
  implements UpdateParametroDetalleUseCase
{
  constructor(
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  execute(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleRepository.updateById(
      id_parametro_detalle,
      parametroDetalle,
    );
  }
}
