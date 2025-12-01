import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from '../../';

export interface GetParametroGeneralUseCase {
  execute(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap>;
}

export class GetParametroGeneralUseCaseImpl
  implements GetParametroGeneralUseCase
{
  constructor(
    private readonly parametroGeneralRepository: ParametrosGeneralesRepository,
  ) {}

  execute(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    return this.parametroGeneralRepository.getById(id_parametro_general);
  }
}
