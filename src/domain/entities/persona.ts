export interface Persona {
  id_persona               : string; // UUID
  id_tipo_persona          : string;
  id_colegio?              : string | null;
  id_sexo                  : string;
  id_ubicacion             : string;
  id_pais?                 : string | null;
  id_departamento?         : string | null;
  id_ciudad?               : string | null;
  id_tipo_identificacion   : string;
  identificacion?          : string | null;
  nombres?                 : string | null;
  apellidos?               : string | null;
  razon_social?            : string | null;
  fecha_nacimiento?        : Date | null;
  nombre_acudiente?        : string | null;
  apellidos_acudiente?     : string | null;
  correo_acudiente?        : string | null;
  celular_acudiente?       : string | null;
  archivo_habeas_data?     : string | null;
  acepta_habeas_data?      : boolean; // por defecto TRUE
  fecha_habeas_data?       : Date | null;
  canal_habeas_data?       : string | null;
  soporte_habeas_data?     : boolean | null;
  dir_ip_habeas_data?      : string | null;
  email?                   : string | null; // UNIQUE
  email_contacto?          : string | null;
  telefono_movil_contacto? : string | null;
  telefono_movil?          : string | null;
  eliminado?               : 'S' | 'N' | null;

  // Campos de auditoría
  id_creado_por?           : string | null;
  fecha_creacion?          : Date | null;
  id_modificado_por?       : string | null;
  fecha_modificacion?      : Date | null;
}
