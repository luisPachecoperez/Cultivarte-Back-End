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

    async getPreCreateActividad( id_usuario: string ): Promise<PreCreateActividad> {
        return this.actividadDataSource.getPreCreateActividad(id_usuario);
    }
    
    async getPreEditActividad(id_actividad: string, id_usuario: string): Promise<PreEditActividad> {
        return this.actividadDataSource.getPreEditActividad(id_actividad, id_usuario);
    }
    
    async getAll(): Promise<Actividad[]> {
        return this.actividadDataSource.getAll();
    }

    async getById(id: string): Promise<Actividad | null> {
        return this.actividadDataSource.getById(id);
    }

    async createActividadAndSesiones(actividad: Actividad): Promise<Actividad> {
        return this.actividadDataSource.createActividadAndSesiones(actividad);
    }

    async createActividad(actividad: Actividad): Promise<RespuestaGrap> {
        return this.actividadDataSource.createActividad(actividad);
    }

    async updateById(id_actividad: string, actividad: Actividad): Promise<Actividad> {
        return this.actividadDataSource.updateById(id_actividad, actividad);
    }

    async deleteById(id_actividad: string): Promise<boolean> {
        return this.actividadDataSource.deleteById(id_actividad);
    }
}
