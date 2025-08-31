import { Asistencia, AsistenciaRepository, RespuestaGrap } from "../../";

export interface UpdateAsistenciaUseCase {
    execute( id_asistencia:string, asistencia: Asistencia ): Promise<RespuestaGrap>;
}           

export class UpdateAsistenciaUseCaseImpl implements UpdateAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute( id_asistencia:string, asistencia: Asistencia ): Promise<RespuestaGrap> {
        return this.asistenciaRepository.updateById( id_asistencia, asistencia );
    }
}
