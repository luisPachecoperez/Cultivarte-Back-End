export interface Nuevo {
    id_persona: string;
}
  
export interface AsistenciaSesiones {
    id_asistencia:      string;
    id_actividad:       string;
    id_sesion:          string;
    id_persona:         string;
    imagen:             string;
    numero_asistentes:  number;
    descripcion:        string;
    nuevos:             Nuevo[];
    id_modificado_por:  string;
    fecha_modificacion: string;
}