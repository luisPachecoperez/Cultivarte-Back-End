import { Asistencia, AsistenciaRepository } from "../../";

export interface UpdateAsistenciaUseCase {
    execute( id_asistencia:string, asistencia: Asistencia ): Promise<Asistencia | null>;
}           

export class UpdateAsistenciaUseCaseImpl implements UpdateAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute( id_asistencia:string, asistencia: Asistencia ): Promise<Asistencia | null> {
        return this.asistenciaRepository.updateById( id_asistencia, asistencia );
    }
}
