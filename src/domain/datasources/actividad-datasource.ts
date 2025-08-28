import { Actividad, PreCreateActividad, PreEditActividad } from "../";

export interface ActividadDataSource {
    getPreCreateActividadData( id_usuario: string ): Promise<PreCreateActividad>;
    getPreEditActividadData( id_actividad: string, id_usuario: string ): Promise<PreEditActividad>;
    getAll(): Promise<Actividad[]>;
    getById( id_actividad: string ): Promise<Actividad | null>;
    createActividadAndSesiones( actividad: Actividad ): Promise<Actividad>;
    createActividad( actividad: Actividad ): Promise<Actividad>;
    updateById( id_actividad: string, actividad: Actividad ): Promise<Actividad>;
    deleteById( id_actividad: string ): Promise<boolean>;
}