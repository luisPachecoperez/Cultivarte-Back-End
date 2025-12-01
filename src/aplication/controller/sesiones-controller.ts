import {
  RespuestaGrap,
  Sesion,
  GetSesionUseCase,
  GetSesionesUseCase,
  GetSesionesSedesUseCase,
  CreateSesionUseCase,
  UpdateSesionUseCase,
  DeleteSesionUseCase,
  EditarSesiones,
  UpdateSesionesUseCase,
} from '../../domain';

export class SesionesController {
  constructor(
    private readonly getSesionesUseCase: GetSesionesUseCase,
    private readonly getSesionUseCase: GetSesionUseCase,
    private readonly getSesionesSedesUseCase: GetSesionesSedesUseCase,
    private readonly createSesionUseCase: CreateSesionUseCase,
    private readonly updateSesionUseCase: UpdateSesionUseCase,
    private readonly deleteSesionUseCase: DeleteSesionUseCase,
    private readonly updateSesionesUseCase: UpdateSesionesUseCase,
  ) {}

  async getSesiones(
    limit: number,
    offset: number,
  ): Promise<Sesion[] | RespuestaGrap> {
    return this.getSesionesUseCase.execute(limit, offset);
  }

  async getSesion(id_sesion: string): Promise<Sesion | RespuestaGrap> {
    return this.getSesionUseCase.execute(id_sesion);
  }

  async getSesionesSedes(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Sesion[] | RespuestaGrap> {
    return this.getSesionesSedesUseCase.execute(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }

  async createSesion(sesion: Sesion): Promise<RespuestaGrap> {
    return this.createSesionUseCase.execute(sesion);
  }

  async updateSesion(
    id_sesion: string,
    sesion: Sesion,
  ): Promise<RespuestaGrap> {
    return this.updateSesionUseCase.execute(id_sesion, sesion);
  }

  async deleteSesion(id_sesion: string): Promise<RespuestaGrap> {
    return this.deleteSesionUseCase.execute(id_sesion);
  }

  async updateSesiones(data: EditarSesiones): Promise<RespuestaGrap> {
    return this.updateSesionesUseCase.execute(data);
  }
}
