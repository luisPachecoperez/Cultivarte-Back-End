import { AsistenciaRepository, 
         Asistencia, 
         AsistenciaDataSource,
         AsistenciaSesiones,
         PreAsistencia,
         RespuestaGrap } from "../../domain";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {
    
    constructor(
        private asistenciaDataSource: AsistenciaDataSource
    ) {}
    
    getAll(): Promise<Asistencia[]> {
        return this.asistenciaDataSource.getAll();
    }
    
    getById(id_asistencia: string): Promise<Asistencia | null> {
        return this.asistenciaDataSource.getById(id_asistencia);
    }
    
    create(asistencia: Asistencia): Promise<Asistencia> {
        return this.asistenciaDataSource.create(asistencia);
    }
    
    updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap> {
        return this.asistenciaDataSource.updateAsistencias(asistenciaSesiones);
    }
    
    updateById(id_asistencia: string, asistencia: Asistencia): Promise<Asistencia | null>  {
        return this.asistenciaDataSource.updateById(id_asistencia, asistencia); 
    }
    
    deleteById(id_asistencia: string): Promise<boolean> {
        return this.asistenciaDataSource.deleteById(id_asistencia);
    }
    
    getPreAsistencia(id_sesion: string): Promise<PreAsistencia> {
        return this.asistenciaDataSource.getPreAsistencia(id_sesion);
    }
}