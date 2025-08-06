export interface ParametroItem {
    id:     string;
    nombre: string;
}

export interface ParametriaEventos {
    Roles?:                 ParametroItem[];
    Listado_de_contenidos?: ParametroItem[];
    actividad_general?:     ParametroItem[];
    Frecuencia?:            ParametroItem[];
    Aliados?:               ParametroItem[];
}
  