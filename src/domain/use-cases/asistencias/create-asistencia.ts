import { Asistencia, AsistenciaRepository, RespuestaGrap } from "../../";

export interface CreateAsistenciaUseCase {
  execute(asistencia: Asistencia): Promise<RespuestaGrap>;
}

export class CreateAsistenciaUseCaseImpl implements CreateAsistenciaUseCase {
  constructor(private asistenciaRepository: AsistenciaRepository) {}

  execute(asistencia: Asistencia): Promise<RespuestaGrap> {
    return this.asistenciaRepository.createAsistencia(asistencia);
  }
}
