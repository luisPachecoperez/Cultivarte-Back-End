import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from "../../";

export interface CreateParametroDetalleUseCase {
  execute(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap>;
}

export class CreateParametroDetalleUseCaseImpl
  implements CreateParametroDetalleUseCase
{
  constructor(
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  execute(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.parametroDetalleRepository.create(parametroDetalle);
  }
}
