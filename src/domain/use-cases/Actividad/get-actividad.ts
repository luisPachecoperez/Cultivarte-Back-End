import { Actividad, ActividadRepository, RespuestaGrap } from "../..";

export interface GetActividadUseCase {
  execute(id_actividad: string): Promise<Actividad | RespuestaGrap>;
}

export class GetActividadUseCaseImpl implements GetActividadUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  execute(id_actividad: string): Promise<Actividad | RespuestaGrap> {
    return this.actividadRepository.getById(id_actividad);
  }
}
