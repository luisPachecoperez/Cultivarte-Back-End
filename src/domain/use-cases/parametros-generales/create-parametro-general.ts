import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from "../../";

export interface CreateParametroGeneralUseCase {
  execute(
    parametrosGenerales: ParametrosGenerales,
  ): Promise<ParametrosGenerales | RespuestaGrap>;
}

export class CreateParametroGeneralUseCaseImpl
  implements CreateParametroGeneralUseCase
{
  constructor(private repository: ParametrosGeneralesRepository) {}

  async execute(
    parametrosGenerales: ParametrosGenerales,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    return this.repository.create(parametrosGenerales);
  }
}
