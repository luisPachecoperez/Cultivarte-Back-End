export interface SesionAsistente {
    id_sesion_asistente: string;
    id_sesion:           string;
    id_beneficiario:     string;
    imagen?:             string;
    nro_asistentes?:     number;
    creado_por?:         string;
    fecha_creacion?:     string;
    modificado_por?:     string;
    fecha_modificacion?: string;
}