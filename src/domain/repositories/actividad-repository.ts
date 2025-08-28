import { PreCreateActividad, Actividad } from "../";

export interface ActividadRepository {
    getPreCreateActividadData( id_usuario: string ): Promise<PreCreateActividad>;
    getAll(): Promise<Actividad[]>;
    getById( id_actividad: string ): Promise<Actividad | null>;
    createActividadAndSesiones( actividad: Actividad ): Promise<Actividad>;
    createActividad( actividad: Actividad ): Promise<Actividad>;
    updateById( id_actividad: string, actividad: Actividad ): Promise<Actividad>;
    deleteById( id_actividad: string ): Promise<boolean>;
}