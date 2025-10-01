import { Asistencia, AsistenciaRepository, RespuestaGrap } from "../../";

export interface GetAsistenciasUseCase {
  execute(): Promise<Asistencia[] | RespuestaGrap>;
}

export class GetAsistenciasUseCaseImpl implements GetAsistenciasUseCase {
  constructor(private asistenciaRepository: AsistenciaRepository) {}

  execute(): Promise<Asistencia[] | RespuestaGrap> {
    return this.asistenciaRepository.getAll();
  }
}
