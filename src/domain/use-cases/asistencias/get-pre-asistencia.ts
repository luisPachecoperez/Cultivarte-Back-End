import { PreAsistencia, AsistenciaRepository } from "../../";

export interface GetPreAsistenciaUseCase {
    execute(id_sesion: string): Promise<PreAsistencia>;
}

export class GetPreAsistenciaUseCaseImpl implements GetPreAsistenciaUseCase {
    
    constructor(
        private asistenciaRepository: AsistenciaRepository
    ) {}

    execute(id_sesion: string): Promise<PreAsistencia> {
        return this.asistenciaRepository.getPreAsistencia( id_sesion );
    }
}
