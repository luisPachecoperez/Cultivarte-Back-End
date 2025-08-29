import { AsistenciaSesiones, 
         RespuestaGrap, 
         AsistenciaRepository } from "../../";

export interface UpdateAsistenciasUseCase {
    execute( asistenciaSesiones: AsistenciaSesiones ): Promise<RespuestaGrap>;
}

export class UpdateAsistenciasUseCaseImpl implements UpdateAsistenciasUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}
    
    execute( asistenciaSesiones: AsistenciaSesiones ): Promise<RespuestaGrap> {
        return this.asistenciaRepository.updateAsistencias( asistenciaSesiones );
    }
}