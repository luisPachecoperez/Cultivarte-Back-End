import { Asistencia, 
         RespuestaGrap, 
         AsistenciaRepository } from "../../";

export interface GetAsistenciasSedeUseCase {
    execute( id_usuario:string, fecha_inicio:string, fecha_fin:string ): Promise<Asistencia[] | RespuestaGrap>;
}

export class GetAsistenciasSedeUseCaseImpl implements GetAsistenciasSedeUseCase {

    constructor(
        private readonly asistenciaRepository: AsistenciaRepository
    ) {}

    execute( id_usuario:string, fecha_inicio:string, fecha_fin:string ): Promise<Asistencia[] | RespuestaGrap> {
        return this.asistenciaRepository.getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin);
    }
}