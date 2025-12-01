import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';

export interface CreateAsistenciaUseCase {
  execute(asistencia: Asistencia): Promise<RespuestaGrap>;
}

export class CreateAsistenciaUseCaseImpl implements CreateAsistenciaUseCase {
  constructor(private readonly asistenciaRepository: AsistenciaRepository) {}

  execute(asistencia: Asistencia): Promise<RespuestaGrap> {
    return this.asistenciaRepository.createAsistencia(asistencia);
  }
}
