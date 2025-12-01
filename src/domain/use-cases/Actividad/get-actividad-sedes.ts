import { Actividad, ActividadRepository, RespuestaGrap } from '../..';

export interface GetActividadSedesUseCase {
  execute(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Actividad[] | RespuestaGrap>;
}

export class GetActividadSedesUseCaseImpl implements GetActividadSedesUseCase {
  constructor(private readonly actividadRepository: ActividadRepository) {}

  execute(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Actividad[] | RespuestaGrap> {
    return this.actividadRepository.getActividadSedes(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }
}
