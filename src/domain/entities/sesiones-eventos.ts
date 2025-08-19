export interface Evento {
    id_evento: string;
    nombre_evento: string;
    descripcion?: string;
}

export interface SesionEvento {
    id_sesion: string;
    desde: string;
    hasta: string;
    estado?: string;
    creado_por?: string;
    fecha_creacion?: string;
    modificado_por?: string;
    fecha_modificacion?: string;
    evento: Evento;
}
  