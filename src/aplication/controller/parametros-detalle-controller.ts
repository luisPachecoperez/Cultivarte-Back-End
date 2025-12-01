import {
  ParametroDetalle,
  CreateParametroDetalleUseCase,
  DeleteParametroDetalleUseCase,
  GetParametroDetalleUseCase,
  GetParametrosDetalleUseCase,
  UpdateParametroDetalleUseCase,
  RespuestaGrap,
} from '../../domain';

export class ParametrosDetalleController {
  constructor(
    private readonly createParametroDetalleUseCase: CreateParametroDetalleUseCase,
    private readonly getParametrosDetalleUseCase: GetParametrosDetalleUseCase,
    private readonly getParametroDetalleUseCase: GetParametroDetalleUseCase,
    private readonly updateParametroDetalleUseCase: UpdateParametroDetalleUseCase,
    private readonly deleteParametroDetalleUseCase: DeleteParametroDetalleUseCase,
  ) {}

  async createParametroDetalle(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.createParametroDetalleUseCase.execute(parametroDetalle);
  }

  async getParametrosDetalle(): Promise<ParametroDetalle[] | RespuestaGrap> {
    return this.getParametrosDetalleUseCase.execute();
  }

  async getParametroDetalle(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.getParametroDetalleUseCase.execute(id_parametro_detalle);
  }

  async updateParametroDetalle(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    return this.updateParametroDetalleUseCase.execute(
      id_parametro_detalle,
      parametroDetalle,
    );
  }

  async deleteParametroDetalle(
    id_parametro_detalle: string,
  ): Promise<RespuestaGrap> {
    return this.deleteParametroDetalleUseCase.execute(id_parametro_detalle);
  }
}
