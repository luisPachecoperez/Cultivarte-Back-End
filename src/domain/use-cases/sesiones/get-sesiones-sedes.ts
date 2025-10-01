import { RespuestaGrap, Sesion, SesionRepository } from "../../";

export interface GetSesionesSedesUseCase {
  execute(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Sesion[] | RespuestaGrap>;
}

export class GetSesionesSedesUseCaseImpl implements GetSesionesSedesUseCase {
  constructor(private readonly sesionesRepository: SesionRepository) {}

  execute(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Sesion[] | RespuestaGrap> {
    return this.sesionesRepository.getSesionesSede(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }
}
