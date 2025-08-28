import { AsistenciaRepository } from "../../";

export interface DeleteAsistenciaUseCase {
    execute( id_asistencia:string ): Promise<boolean>;
}   

export class DeleteAsistenciaUseCaseImpl implements DeleteAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute( id_asistencia:string ): Promise<boolean> {
        return this.asistenciaRepository.deleteById( id_asistencia );
    }
}