export interface Sesion {
    id_sesion: string;
    id_actividad: string;
    fecha_actividad: Date | string;
    hora_inicio: string;
    hora_fin: string;
    imagen: string;
    nro_asistentes: number;
    descripcion: string;
    id_creado_por: string;
    fecha_creacion: Date | string;
    id_modificado_por: string;
    fecha_modificacion: Date | string;
}
