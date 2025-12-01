import { AsistenciaRepository, RespuestaGrap } from '../../';

export interface DeleteAsistenciaUseCase {
  execute(id_asistencia: string): Promise<RespuestaGrap>;
}

export class DeleteAsistenciaUseCaseImpl implements DeleteAsistenciaUseCase {
  constructor(private readonly asistenciaRepository: AsistenciaRepository) {}

  execute(id_asistencia: string): Promise<RespuestaGrap> {
    return this.asistenciaRepository.deleteById(id_asistencia);
  }
}
