import { PreAsistencia, AsistenciaRepository, RespuestaGrap } from "../../";

export interface GetPreAsistenciaUseCase {
  execute(id_sesion: string): Promise<PreAsistencia | RespuestaGrap>;
}

export class GetPreAsistenciaUseCaseImpl implements GetPreAsistenciaUseCase {
  constructor(private asistenciaRepository: AsistenciaRepository) {}

  execute(id_sesion: string): Promise<PreAsistencia | RespuestaGrap> {
    return this.asistenciaRepository.getPreAsistencia(id_sesion);
  }
}
