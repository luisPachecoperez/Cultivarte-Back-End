export interface Item {
    id: string;
    nombre: string;
}
export interface NombreEvento {
    id_parametro_detalle: string;
    nombre: string;
}
export interface FrecuenciaItem {
    id_frecuencia: string;
    nombre: string;
}
export interface SedeItem {
    id_sede: string;
    nombre: string;
}
export interface TipoActividadItem {
    id_tipo_actividad: string;
    nombre: string;
}
export interface AliadoItem {
    id_aliado: string;
    nombre: string;
}
export interface NombresActividad {
    id_tipo_actividad: string;
    nombre: string;
}
export interface ResponsableItem {
    id_responsable: string;
    nombre: string;
}
export interface PreCreateActividad {
    id_programa: string;
    sedes: SedeItem[];
    tiposDeActividad: TipoActividadItem[];
    aliados: AliadoItem[];
    responsables: ResponsableItem[];
    nombresDeActividad: NombresActividad[];
    frecuencias: FrecuenciaItem[];
}
export interface NombreEventos {
    id_parametro_detalle: string;
    nombre: string;
}
export interface RespuestaEventos {
    NOMBRE_EVENTOS: NombreEventos;
}
