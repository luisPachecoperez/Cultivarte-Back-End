export interface Asistencia {
    id_asistencia: string;
    id_sesion: string;
    id_persona?: string | null;
    id_creado_por?: string | null;
    fecha_creacion?: string | null;
    id_modificado_por?: string | null;
    fecha_modificacion?: string | null;
}
