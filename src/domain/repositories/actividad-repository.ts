import { PreCreateActividad, Actividad, RespuestaGrap, PreEditActividad } from "../";

export interface ActividadRepository {
    getPreCreateActividad( id_usuario: string ): Promise<PreCreateActividad>;
    getPreEditActividad( id_actividad: string, id_usuario: string ): Promise<PreEditActividad>;
    getAll(): Promise<Actividad[]>;
    getById( id_actividad: string ): Promise<Actividad | null>;
    createActividadAndSesiones( actividad: Actividad ): Promise<Actividad>;
    createActividad( actividad: Actividad ): Promise<RespuestaGrap>;
    updateById( id_actividad: string, actividad: Actividad ): Promise<Actividad>;
    deleteById( id_actividad: string ): Promise<boolean>;
}