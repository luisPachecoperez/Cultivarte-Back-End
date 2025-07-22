export interface Usuario {
    id_usuario:           string;
    id_sede:              string;
    id_role:              string;
    correo:               string;
    creado_por?:          string;
    fecha_creacion?:      string;
    modificado_por?:      string;
    fecha_modificacion?:  string;
}