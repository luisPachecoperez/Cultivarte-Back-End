import {
  Actividad,
  PreCreateActividad,
  PreEditActividad,
  CreateActividadAndSesionesUseCase,
  GetActividadesUseCase,
  GetActividadUseCase,
  GetActividadSedesUseCase,
  UpdateActividadUseCase,
  DeleteActividadUseCase,
  CreateActividadUseCase,
  RespuestaGrap,
  GetPreCreateActividadUseCase,
  GetPreEditActividadUseCase,
} from "../../domain";

export class ActividadesController {
  constructor(
    private readonly getPreCreateActividadUseCase: GetPreCreateActividadUseCase,
    private readonly getPreEditActividadUseCase: GetPreEditActividadUseCase,
    private readonly getActividadesUseCase: GetActividadesUseCase,
    private readonly getActividadUseCase: GetActividadUseCase,
    private readonly getActividadSedesUseCase: GetActividadSedesUseCase,
    private readonly createActividadAndSesionesUseCase: CreateActividadAndSesionesUseCase,
    private readonly createActividadUseCase: CreateActividadUseCase,
    private readonly updateActividadUseCase: UpdateActividadUseCase,
    private readonly deleteActividadUseCase: DeleteActividadUseCase,
  ) {}

  async getPreCreateActividad(
    id_usuario: string,
  ): Promise<PreCreateActividad | RespuestaGrap> {
    return this.getPreCreateActividadUseCase.execute(id_usuario);
  }

  async getPreEditActividad(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap> {
    return this.getPreEditActividadUseCase.execute(id_actividad, id_usuario);
  }

  async getActividades(
    limit: number,
    offset: number,
  ): Promise<Actividad[] | RespuestaGrap> {
    return this.getActividadesUseCase.execute(limit, offset);
  }

  async getActividad(id_actividad: string): Promise<Actividad | RespuestaGrap> {
    return this.getActividadUseCase.execute(id_actividad);
  }

  async getActividadSedes(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Actividad[] | RespuestaGrap> {
    return this.getActividadSedesUseCase.execute(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }

  async createActividadAndSesiones(
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    return this.createActividadAndSesionesUseCase.execute(actividad);
  }

  async createActividad(
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    return this.createActividadUseCase.execute(actividad);
  }
  async updateActividad(
    id_actividad: string,
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    return this.updateActividadUseCase.execute(id_actividad, actividad);
  }

  async deleteActividad(id_actividad: string): Promise<RespuestaGrap> {
    return this.deleteActividadUseCase.execute(id_actividad);
  }
}
