import { Sesion } from './sesion';
export interface EditarSesiones {
    sesiones: {
        nuevos: Sesion[];
        modificados: Sesion[];
        eliminados: SesionEliminada[];
    };
}
export interface NuevaSesion {
    id_sesion: string;
    id_evento: string;
    fecha_sesion: string;
    hora_inicio: string;
    hora_fin: string;
}
export interface SesionModificada {
    id_evento: string;
    id_sesion: string;
    fecha_sesion: string;
    hora_inicio: string;
    hora_fin: string;
}
export interface SesionEliminada {
    id_sesion: string;
}
