import { PreEditActividad, ActividadRepository, RespuestaGrap } from "../..";

export interface GetPreEditActividadUseCase {
  execute(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap>;
}

export class GetPreEditActividadUseCaseImpl
  implements GetPreEditActividadUseCase
{
  constructor(private actividadRepository: ActividadRepository) {}

  execute(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap> {
    return this.actividadRepository.getPreEditActividad(
      id_actividad,
      id_usuario,
    );
  }
}
