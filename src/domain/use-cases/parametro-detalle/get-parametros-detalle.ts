import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../../';

export interface GetParametrosDetalleUseCase {
  execute(): Promise<ParametroDetalle[] | RespuestaGrap>;
}

export class GetParametrosDetalleUseCaseImpl
  implements GetParametrosDetalleUseCase
{
  constructor(
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  execute(): Promise<ParametroDetalle[] | RespuestaGrap> {
    return this.parametroDetalleRepository.getAll();
  }
}
