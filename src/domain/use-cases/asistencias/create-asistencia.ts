import { Asistencia, AsistenciaRepository } from "../../";

export interface CreateAsistenciaUseCase {
    execute( asistencia: Asistencia ): Promise<Asistencia>;
}

export class CreateAsistenciaUseCaseImpl implements CreateAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute( asistencia: Asistencia ): Promise<Asistencia> {
        return this.asistenciaRepository.createAsistencia( asistencia );
    }
}