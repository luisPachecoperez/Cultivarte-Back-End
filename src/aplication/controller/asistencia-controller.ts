import { Asistencia,
         GetAsistenciaUseCase,
         GetAsistenciasUseCase,
         CreateAsistenciaUseCase,
         UpdateAsistenciaUseCase,
         DeleteAsistenciaUseCase,
         UpdateAsistenciasUseCase,
         PreAsistencia,
         GetPreAsistenciaUseCase, 
         AsistenciaSesiones,
         RespuestaGrap} from "../../domain";



export class AsistenciasController {
    constructor(
        private readonly getAsistenciasUseCase: GetAsistenciasUseCase,
        private readonly getAsistenciaUseCase: GetAsistenciaUseCase,
        private readonly createAsistenciaUseCase: CreateAsistenciaUseCase,
        private readonly updateAsistenciaUseCase: UpdateAsistenciaUseCase,
        private readonly deleteAsistenciaUseCase: DeleteAsistenciaUseCase,
        private readonly updateAsistenciasUseCase: UpdateAsistenciasUseCase,
        private readonly getPreAsistenciaUseCase: GetPreAsistenciaUseCase,
    ) {}

    async getAsistencias(): Promise<Asistencia[] | null> {
        return this.getAsistenciasUseCase.execute();
    }

    async getAsistencia( id_asistencia: string ): Promise<Asistencia | null> {
        return this.getAsistenciaUseCase.execute( id_asistencia );
    }

    async createAsistencia( asistencia: Asistencia ): Promise<Asistencia> {
        return this.createAsistenciaUseCase.execute( asistencia );
    }

    async updateAsistencia( id_asistencia: string, asistencia: Asistencia ): Promise<Asistencia | null> {
        return this.updateAsistenciaUseCase.execute( id_asistencia, asistencia );
    }

    async updateAsistencias( asistenciaSesiones: AsistenciaSesiones ): Promise<RespuestaGrap> {
        return this.updateAsistenciasUseCase.execute( asistenciaSesiones );
    }
    
    async deleteAsistencia( id_asistencia: string ): Promise<boolean> {
        return this.deleteAsistenciaUseCase.execute( id_asistencia );
    }

    async getPreAsistencia( id_sesion: string ): Promise<PreAsistencia> {
        return this.getPreAsistenciaUseCase.execute( id_sesion );
    }
}