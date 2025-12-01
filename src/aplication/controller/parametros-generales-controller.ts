import {
  ParametrosGenerales,
  CreateParametroGeneralUseCase,
  DeleteParametroGeneralUseCase,
  GetParametroGeneralUseCase,
  GetParametrosGeneralesUseCase,
  UpdateParametroGeneralUseCase,
  RespuestaGrap,
} from '../../domain';

export class ParametrosGeneralesController {
  constructor(
    private readonly createParametroGeneralUseCase: CreateParametroGeneralUseCase,
    private readonly getParametrosGeneralesUseCase: GetParametrosGeneralesUseCase,
    private readonly getParametroGeneralUseCase: GetParametroGeneralUseCase,
    private readonly updateParametroGeneralUseCase: UpdateParametroGeneralUseCase,
    private readonly deleteParametroGeneralUseCase: DeleteParametroGeneralUseCase,
  ) {}

  async createParametroGeneral(
    parametroGeneral: ParametrosGenerales,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    return this.createParametroGeneralUseCase.execute(parametroGeneral);
  }

  async getParametrosGenerales(): Promise<
    ParametrosGenerales[] | RespuestaGrap
  > {
    return this.getParametrosGeneralesUseCase.execute();
  }

  async getParametroGeneral(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    return this.getParametroGeneralUseCase.execute(id_parametro_general);
  }

  async updateParametroGeneral(
    id_parametro_general: string,
    parametroGeneral: ParametrosGenerales,
  ): Promise<RespuestaGrap> {
    return this.updateParametroGeneralUseCase.execute(
      id_parametro_general,
      parametroGeneral,
    );
  }

  async deleteParametroGeneral(
    id_parametro_general: string,
  ): Promise<RespuestaGrap> {
    return this.deleteParametroGeneralUseCase.execute(id_parametro_general);
  }
}
