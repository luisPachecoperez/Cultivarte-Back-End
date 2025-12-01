import { Actividad, ActividadRepository, RespuestaGrap } from '../..';

export interface UpdateActividadUseCase {
  execute(
    id_actividad: string,
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap>;
}

export class UpdateActividadUseCaseImpl implements UpdateActividadUseCase {
  constructor(private readonly actividadRepository: ActividadRepository) {}

  execute(
    id_actividad: string,
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    return this.actividadRepository.updateById(id_actividad, actividad);
  }
}
