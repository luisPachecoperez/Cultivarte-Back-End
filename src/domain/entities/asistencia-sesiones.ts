export interface Nuevo {
    id_persona: string;
}
  
export interface AsistenciaSesiones {
    id_actividad:       string;
    id_sesion:          string;
    id_usuario:         string;
    imagen:             string;
    numero_asistentes:  number;
    descripcion:        string;
    nuevos:             Nuevo[];
}