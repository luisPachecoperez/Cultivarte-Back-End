import { Asistencia, AsistenciaRepository } from "../../";

export interface GetAsistenciasUseCase {
    execute(): Promise<Asistencia[]>;
}

export class GetAsistenciasUseCaseImpl implements GetAsistenciasUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute(): Promise<Asistencia[]> {
        return this.asistenciaRepository.getAll();
    }
}