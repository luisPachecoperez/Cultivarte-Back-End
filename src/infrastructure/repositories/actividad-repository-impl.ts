import { Actividad,
         ActividadDataSource, 
         ActividadRepository, 
         PreCreateActividad, 
         RespuestaGrap,
         PreEditActividad } from "../../domain";

export class ActividadRepositoryImpl implements ActividadRepository {
    
    constructor(
        private actividadDataSource: ActividadDataSource
    ) {}

    async getPreCreateActividad( id_usuario: string ): Promise<PreCreateActividad | RespuestaGrap> {
        try {
            return this.actividadDataSource.getPreCreateActividad( id_usuario );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener pre-create actividad: ' + error };
        }
    }
    
    async getPreEditActividad( id_actividad: string, id_usuario: string ): Promise<PreEditActividad | RespuestaGrap> {
        try {
            return this.actividadDataSource.getPreEditActividad( id_actividad, id_usuario );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener pre-edit actividad: ' + error };
        }
    }
    
    async getActividadSedes( id_usuario: string, fecha_inicio: string, fecha_fin: string ): Promise<Actividad[] | RespuestaGrap> {
        try {
            return this.actividadDataSource.getActividadSedes( id_usuario, fecha_inicio, fecha_fin );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener actividades por sedes: ' + error };
        }
    }
    
    async getAll(): Promise<Actividad[] | RespuestaGrap> {
        try {
            return this.actividadDataSource.getAll();   
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener actividades: ' + error };
        }
    }

    async getById( id: string ): Promise<Actividad | RespuestaGrap> {
        try {
            return this.actividadDataSource.getById( id );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener actividad por id: ' + error };
        }
    }

    async createActividadAndSesiones( actividad: Actividad ): Promise<Actividad | RespuestaGrap> {
        try {
            return this.actividadDataSource.createActividadAndSesiones( actividad );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear actividad y sesiones: ' + error };
        }
    }

    async createActividad( actividad: Actividad ): Promise<RespuestaGrap> {
        try {
            return this.actividadDataSource.createActividad( actividad );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear actividad: ' + error };
        }
    }

    async updateById( id_actividad: string, actividad: Actividad ): Promise<Actividad | RespuestaGrap> {
        try {
            return this.actividadDataSource.updateById( id_actividad, actividad );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al actualizar actividad: ' + error };
        }
    }

    async deleteById( id_actividad: string ): Promise<RespuestaGrap> {
        try {
            return this.actividadDataSource.deleteById( id_actividad );
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al eliminar actividad: ' + error };
        }
    }
}
