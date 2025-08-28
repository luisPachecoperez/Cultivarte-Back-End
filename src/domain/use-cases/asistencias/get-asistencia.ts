import { Asistencia, AsistenciaRepository } from "../../";

export interface GetAsistenciaUseCase {
    execute( id_asistencia:string ): Promise<Asistencia | null>;
}

export class GetAsistenciaUseCaseImpl implements GetAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute( id_asistencia:string ): Promise<Asistencia | null> {
        return this.asistenciaRepository.getById( id_asistencia );
    }
}