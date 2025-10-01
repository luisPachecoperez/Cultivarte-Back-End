import { ParametrosGeneralesRepository, RespuestaGrap } from "../../";

export interface DeleteParametroGeneralUseCase {
  execute(id_parametro_general: string): Promise<RespuestaGrap>;
}

export class DeleteParametroGeneralUseCaseImpl
  implements DeleteParametroGeneralUseCase
{
  constructor(
    private readonly parametroGeneralRepository: ParametrosGeneralesRepository,
  ) {}

  execute(id_parametro_general: string): Promise<RespuestaGrap> {
    return this.parametroGeneralRepository.deleteById(id_parametro_general);
  }
}
