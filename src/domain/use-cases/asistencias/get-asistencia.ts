import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../';

export interface GetAsistenciaUseCase {
  execute(id_asistencia: string): Promise<Asistencia | RespuestaGrap>;
}

export class GetAsistenciaUseCaseImpl implements GetAsistenciaUseCase {
  constructor(private readonly asistenciaRepository: AsistenciaRepository) {}

  execute(id_asistencia: string): Promise<Asistencia | RespuestaGrap> {
    return this.asistenciaRepository.getById(id_asistencia);
  }
}
