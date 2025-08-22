export interface Item {
    id:     string;
    nombre: string;
}
  
export interface NombreEvento {
    id_parametro_detalle: string;
    nombre:               string;
}
  
export interface PreCreateActividad {
    id_programa:          string;
    sedes:                Item[];
    tiposDeEvento:        Item[];
    aliados:              Item[];
    responsables:         Item[];
    nombreDeEventos:      NombreEventos[];
    frecuencias:          Item[];
}


export interface NombreEventos {
    LISTADO_CONTENIDO: Item[];
    ACTIVIDAD_GENERAL: Item[];
}
  
export interface RespuestaEventos {
    NOMBRE_EVENTOS: NombreEventos;
}