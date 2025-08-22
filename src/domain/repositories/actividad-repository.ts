import { PreCreateActividad } from "../entities/pre-create-actividad";
import { Actividad } from "../entities/actividad";

export interface ActividadRepository {
    getPreCreateActividadData( id_usuario: string ): Promise<PreCreateActividad>;
    getAll(): Promise<Actividad[]>;
    getById( id_actividad: string ): Promise<Actividad | null>;
    create( actividad: Actividad ): Promise<Actividad>;
    updateById( id_actividad: string, actividad: Actividad ): Promise<Actividad>;
    deleteById( id_actividad: string ): Promise<boolean>;
}