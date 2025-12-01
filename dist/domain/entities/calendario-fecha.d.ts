export interface Evento {
    id_actividad: string;
    id_sesion: string;
    nombre_actividad: string;
    desde: string;
    hasta: string;
    asistentes_evento: number;
}
export interface CalendarioInput {
    fecha_inicial: string;
    fecha_final: string;
    id_usuario: string;
}
