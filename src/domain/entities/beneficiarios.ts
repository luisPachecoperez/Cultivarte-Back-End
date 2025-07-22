export interface Beneficiario {
    id_beneficiario:             string;
    id_colegio?:                 string;
    nombre:                      string;
    primer_apellido:             string;
    segundo_apellido?:           string;
    fecha_nacimiento:            string;
    identificacion:              string;
    genero:                      string;
    ubicacion:                   string;
    nombre_acudiente:            string;
    primer_apellido_acudiente:   string;
    segundo_apellido_acudiente?: string;
    correo_acudiente:            string;
    celular_acudiente:           string;
    habeas_data?:                string;
    creado_por?:                 string;
    fecha_creacion?:             string;
    modificado_por?:             string;
    fecha_modificacion?:         string;
}