import { Actividad, ActividadDataSource, ActividadRepository, PreCreateActividad } from "../../domain";

export class ActividadRepositoryImpl implements ActividadRepository {
    
    constructor(
        private actividadDataSource: ActividadDataSource
    ) {}

    async getPreCreateActividadData( id_usuario: string ): Promise<PreCreateActividad> {
        return this.actividadDataSource.getPreCreateActividadData(id_usuario);
    }
    
    async getAll(): Promise<Actividad[]> {
        return this.actividadDataSource.getAll();
    }

    async getById(id: string): Promise<Actividad | null> {
        return this.actividadDataSource.getById(id);
    }

    async create(actividad: Actividad): Promise<Actividad> {
        return this.actividadDataSource.create(actividad);
    }

    async updateById(id_actividad: string, actividad: Actividad): Promise<Actividad> {
        return this.actividadDataSource.updateById(id_actividad, actividad);
    }

    async deleteById(id_actividad: string): Promise<boolean> {
        return this.actividadDataSource.deleteById(id_actividad);
    }
}
