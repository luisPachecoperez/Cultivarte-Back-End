import { ParametroDetalleRepository, RespuestaGrap } from "../../";

export interface DeleteParametroDetalleUseCase {
  execute(id_parametro_detalle: string): Promise<RespuestaGrap>;
}

export class DeleteParametroDetalleUseCaseImpl
  implements DeleteParametroDetalleUseCase
{
  constructor(
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  execute(id_parametro_detalle: string): Promise<RespuestaGrap> {
    return this.parametroDetalleRepository.deleteById(id_parametro_detalle);
  }
}
