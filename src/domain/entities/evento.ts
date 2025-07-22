export interface Evento {
    id:                 string;
    institucional:      string;
    id_tipo_evento:     string;
    nombre_evento:      string;
    descripcion:        string;
    id_responsable:     string;
    id_aliado:          string;
    id_sede:            string;
    fecha_evento_desde: Date | null;
    fecha_evento_hasta: Date | null;
    id_programacion:    string | null;
    estado:             string | null;
    creado_por:         string | null;
    fecha_creacion:     Date | null;
    modificado_por:     string | null;
    fecha_modificacion: Date | null;
}