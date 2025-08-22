export interface ParametroDetalle {
    id_parametro_detalle: string;
    id_parametro_general: string;
    nombre?:              string;
    codigo?:              string;
    orden?:               number;
    valores?:             string;
    estado?:              string;
    id_creado_por?:       string;
    fecha_creacion?:      string;
    id_modificado_por?:   string;
    fecha_modificacion?:  string;
}