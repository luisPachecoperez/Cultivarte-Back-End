export interface Sesion {
    id_sesion:           string;
    id_evento:           string;
    desde:               string;
    hasta:               string;
    estado?:             string;
    creado_por?:         string;
    fecha_creacion?:     string;
    modificado_por?:     string;
    fecha_modificacion?: string;
}